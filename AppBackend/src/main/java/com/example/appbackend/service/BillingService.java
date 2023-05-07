package com.example.appbackend.service;
import com.example.appbackend.dto.BillingResponse;
import com.example.appbackend.dto.CustomerBillingDTO;
import com.example.appbackend.dto.ShopDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.Shop;
import com.example.appbackend.repository.BillingProductRepository;
import com.example.appbackend.repository.BillingRepository;
import com.example.appbackend.repository.ShopRepository;
import com.example.appbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.core.userdetails.UserDetailsResourceFactoryBean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public void increaseStatus(Long id) {
        Billing billing = billingRepository.findById(id).orElseThrow();
        int currentStatus = billing.getStatus();
        billing.setStatus(currentStatus + 1);
        billingRepository.save(billing);
    }

    public void decreaseStatus(Long id) {
        Billing billing = billingRepository.findById(id).orElseThrow();
        int currentStatus = billing.getStatus();
        billing.setStatus(currentStatus - 1);
        billingRepository.save(billing);
    }
}
