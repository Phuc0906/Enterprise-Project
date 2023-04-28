package com.example.appbackend.controller;

import com.example.appbackend.dto.BillingDTO;
import com.example.appbackend.dto.BillingProductDTO;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.BillingProduct;
import com.example.appbackend.repository.ShopRepository;
import com.example.appbackend.repository.UserRepository;
import com.example.appbackend.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/billing")
@RequiredArgsConstructor
public class BillingController {
    @Autowired
    private BillingService billingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShopRepository shopRepository;

    @GetMapping
    public List<Billing> getAllBilling() {
        return billingService.getAllBilling();
    }

    @GetMapping(path = "{status}")
    public List<Billing> getAllBillingByStatus(@PathVariable("status") int status) {
        return billingService.getAllBillingByStatus(status);
    }

    @PostMapping
    public void addBilling(@RequestBody BillingDTO billingDTO) {
        Billing tempBill = new Billing();
        tempBill.setAppUser(userRepository.findById(billingDTO.getCustomerId()).orElse(null));
        tempBill.setShop(shopRepository.findById(billingDTO.getShopId()).orElse(null));
        tempBill.setStatus(0);
        tempBill.setTotalPrice(billingDTO.getTotalPrice());
        for(BillingProductDTO productDTO : billingDTO.getProducts()) {
            BillingProduct product = new BillingProduct(productDTO);
            tempBill.addProduct(product);
        }
        billingService.addBilling(tempBill);
    }
}
