package com.example.appbackend.service;

import com.example.appbackend.dto.BillingProductDTO;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.BillingProduct;
import com.example.appbackend.repository.BillingProductRepository;
import com.example.appbackend.repository.BillingRepository;
import com.example.appbackend.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingService {
    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private BillingProductRepository billingProductRepository;

    @Autowired
    private ShopRepository shopRepository;

    public void addBilling(Billing billing) {
        billingRepository.save(billing);
        billingProductRepository.saveAll(billing.getBillingProductList());
    }

    public List<Billing> getAllBilling() {
        return billingRepository.findAll();
    }

    public List<Billing> getAllBillingByStatus(int status) {
        return billingRepository.findAllByStatus(status);
    }
}
