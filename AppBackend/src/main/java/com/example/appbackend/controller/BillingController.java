package com.example.appbackend.controller;

import com.example.appbackend.dto.BillingDTO;
import com.example.appbackend.dto.BillingProductDTO;
import com.example.appbackend.dto.BillingResponse;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.BillingProduct;
import com.example.appbackend.repository.BillingRepository;
import com.example.appbackend.repository.ShopRepository;
import com.example.appbackend.repository.UserRepository;
import com.example.appbackend.response.ProductRecord;
import com.example.appbackend.response.ShopSummaryResponse;
import com.example.appbackend.service.BillingService;
import com.example.appbackend.service.InCartService;
import com.example.appbackend.service.InStockService;
import com.example.appbackend.service.OnDeliveryService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/billing")
@RequiredArgsConstructor
@CrossOrigin
public class BillingController {
    @Autowired
    private BillingService billingService;

    @Autowired
    private InCartService inCartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private InStockService inStockService;

    @GetMapping
    public List<Billing> getAllBilling() {
        return billingService.getAllBilling();
    }

    @GetMapping(path = "{status}")
    public List<BillingResponse> getAllBillingByStatus(@PathVariable("status") int status) {
        return billingService.getAllBillingByStatus(status);
    }

    @PostMapping(path = "/up/{id}")
    public void upStatus(@PathVariable("id") Long id, @RequestParam("phone") String phoneNumber) {
        billingService.increaseStatus(id, phoneNumber);
    }

    @PostMapping(path = "/down/{id}")
    public void downStatus(@PathVariable("id") Long id, @RequestParam("phone") String phoneNumber){
        billingService.decreaseStatus(id, phoneNumber);
    }

    @PostMapping
    public void addBilling(@RequestBody BillingDTO billingDTO) {
        Billing tempBill = new Billing();
        System.out.println("phoneNumber: " + billingDTO.getCustomerPhoneNumber());
        System.out.println("shop: " + billingDTO.getShopName());
        tempBill.setId(billingDTO.getId());
        tempBill.setAppUser(userRepository.findByPhoneNumber(billingDTO.getCustomerPhoneNumber()).orElse(null));
        tempBill.setShop(shopRepository.findByName(billingDTO.getShopName()).orElse(null));
        tempBill.setStatus(0);
        tempBill.setTotalPrice(billingDTO.getTotalPrice());
        List<Long> cartProductId = Arrays.stream(billingDTO.getProducts()).collect(Collectors.toList()).stream().map(products -> products.getProductId()).collect(Collectors.toList());
        List<String> cartProductSize = Arrays.stream(billingDTO.getProducts()).collect(Collectors.toList()).stream().map(product -> product.getSize()).collect(Collectors.toList());
        System.out.println(cartProductSize.size() + " size of id carts");
        for(BillingProductDTO productDTO : billingDTO.getProducts()) {
            BillingProduct product = new BillingProduct(productDTO);
            tempBill.addProduct(product);

        }
        inCartService.deleteFromCart(List.of(billingDTO.getProducts()), billingDTO.getCustomerPhoneNumber());
        billingService.addBilling(tempBill);
        inStockService.deleteFromStock(List.of(billingDTO.getProducts()), billingDTO.getCustomerPhoneNumber());
    }

    @GetMapping(path = "/{phoneNumber}/{status}")
    public List<BillingResponse> getUserBillings(@PathVariable("phoneNumber") String phoneNumber, @PathVariable("status") String status) throws Exception {
        return billingService.getUserBillings(phoneNumber, Integer.parseInt(status));
    }
    @GetMapping(path = "/shop/{shopName}/{status}")
    public List<BillingResponse> getShopBillings(@PathVariable("shopName") String shopName, @PathVariable("status") String status) throws Exception {
        System.out.println(shopName + " " + status);
        return billingService.getShopBillings(shopName, Integer.parseInt(status));
    }

    @GetMapping(path = "shipper/{phoneNumber}/{status}")
    public List<BillingResponse> getShipperBillings(@PathVariable("phoneNumber") String phoneNumber, @PathVariable("status") String status) throws Exception {
        return billingService.getShipperBillings(phoneNumber, Integer.parseInt(status));
    }

    @GetMapping(path = "shop-record/{shopName}")
    public List<ShopSummaryResponse> getShopRecord(@PathVariable("shopName") String shopName) throws Exception {
        return billingService.getShopSummary(shopName, 3);
    }

    @GetMapping(path = "product-record/{shopName}")
    public List<ProductRecord> getProductsRecordOfShop(@PathVariable("shopName") String shopName) {
        return billingService.getProductRecordsByShop(shopName);
    }

    @GetMapping(path = "category-record/{shopName}")
    public List<ProductRecord> getCategoryRecordOfShop(@PathVariable("shopName") String shopName) {
        return billingService.getCategoryRecordsByShop(shopName);
    }
}
