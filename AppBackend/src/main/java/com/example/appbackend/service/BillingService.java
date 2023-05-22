package com.example.appbackend.service;
import com.example.appbackend.dto.BillingResponse;
import com.example.appbackend.dto.CustomerBillingDTO;
import com.example.appbackend.dto.ShopDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.BillingProduct;
import com.example.appbackend.model.Shop;
import com.example.appbackend.repository.*;
import com.example.appbackend.response.ProductRecord;
import com.example.appbackend.response.ShopSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.core.userdetails.UserDetailsResourceFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BillingService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ShopRepository shopRepository;

    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private BillingProductRepository billingProductRepository;

    @Autowired
    private OnDeliveryService onDeliveryService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public void addBilling(Billing billing) {
        billingRepository.save(billing);
        billingProductRepository.saveAll(billing.getBillingProductList());
    }

    public List<Billing> getAllBilling() {
        return billingRepository.findAll();
    }

    public List<BillingResponse> getAllBillingByStatus(int status) {
        List<Billing> bills = billingRepository.findAllByStatus(status);
        List<BillingResponse> response = new ArrayList<>();
        for (Billing billing : bills) {
            BillingResponse tmpBillingResponse = new BillingResponse();
            tmpBillingResponse.setId(billing.getId());
            //handle user
            AppUser user = userRepository.findByPhoneNumber(billing.getUser()).orElse(null);
            CustomerBillingDTO cus = new CustomerBillingDTO(user);
            //handle shop
            Shop shop = shopRepository.findByName(billing.getShop()).orElse(null);
            ShopDTO shopDTO = new ShopDTO(shop);
            tmpBillingResponse.setCustomer(cus);
            tmpBillingResponse.setShop(shopDTO);
            tmpBillingResponse.setProducts(billing.getBillingProductList());
            tmpBillingResponse.setTotalPrice(billing.getTotalPrice());
            response.add(tmpBillingResponse);
        }
        return response;
    }

    public void increaseStatus(Long id, String phoneNumber) {
        Billing billing = billingRepository.findById(id).orElseThrow();
        int currentStatus = billing.getStatus();
        if (currentStatus == 1) {
            onDeliveryService.save(id,phoneNumber);
        }
        billing.setStatus(currentStatus + 1);
        billingRepository.save(billing);
    }

    public void deleteBilling(Long id) {
        Billing billing = billingRepository.findById(id).orElseThrow();
        List<BillingProduct> billingProducts = billingProductRepository.findByBilling(billing);
        billingProductRepository.deleteAll(billingProducts);
        billingRepository.delete(billing);
    }

    public void decreaseStatus(Long id, String phoneNumber) {
        Billing billing = billingRepository.findById(id).orElseThrow();
        int currentStatus = billing.getStatus();
        if(currentStatus ==2) {
            onDeliveryService.delete(id,phoneNumber);
        }
        billing.setStatus(currentStatus - 1);
        billingRepository.save(billing);
    }

    public List<BillingResponse> getUserBillings(String phoneNumber, int status) throws Exception {
        try {
            return billingRepository.getUserBilling(status, phoneNumber);
        }catch (Exception ex) {
            throw new Exception("Exception this step " + ex.toString());
        }
    }

    public List<BillingResponse> getShipperBillings(String phoneNumber, int status) throws Exception {
        try {
            return billingRepository.getShipperBilling(status, phoneNumber);
        }catch (Exception ex) {
            throw new Exception("Exception this step " + ex.toString());
        }
    }

    public List<BillingResponse> getShopBillings(String shopName, int status) throws Exception {
        try {
            Shop shop = shopRepository.findByName(shopName).orElseThrow();
            System.out.println(shopName+"----"+status);
            return billingRepository.getShopBilling(status, shop.getId());
        }catch (Exception ex) {
            throw new Exception("Exception this step " + ex.toString());
        }
    }

    public List<ShopSummaryResponse> getShopSummary(String shopName, int status) throws Exception {
        List<ShopSummaryResponse> summaryResponses = new ArrayList<>();
        List<BillingResponse> responses = getShopBillings(shopName, status);
        HashMap<LocalDate, List<BillingProduct>> dateListHashMap = new HashMap<>();
        for (int i = 0; i < responses.size(); i++) {
            if (!dateListHashMap.keySet().contains(responses.get(i).getDate())) {
                dateListHashMap.put(responses.get(i).getDate(), new ArrayList<>());
            }
            dateListHashMap.get(responses.get(i).getDate()).addAll(responses.get(i).getProducts());
        }
        List<LocalDate> keys = new ArrayList<>(dateListHashMap.keySet());
        for (int i = 0; i < dateListHashMap.keySet().size(); i++) {
            ShopSummaryResponse summaryResponse = new ShopSummaryResponse(keys.get(i), dateListHashMap.get(keys.get(i)));
            summaryResponses.add(summaryResponse);
        }
        return summaryResponses;
    }

    public List<ProductRecord> getProductRecordsByShop(String shopName) {
        return productRepository.getRecordsOfShop(3, shopName);
    }

    public List<ProductRecord> getCategoryRecordsByShop(String shopName) {
        return categoryRepository.getCategoryRecord(3, shopName);
    }

    public List<BillingResponse> getAllBillings(String shopName) throws Exception {
        try {
            Shop shop = shopRepository.findByName(shopName).orElseThrow();
            return billingRepository.getAllBillings(shop.getId());
        }catch (Exception ex) {
            throw new Exception("Exception this step " + ex.toString());
        }
    }

    public List<Long> getProductsByProductId(Long id, String phoneNumber) {
        return billingRepository.getProductsByProductId(id, phoneNumber);
    }

}
