package com.example.appbackend.service;

import com.example.appbackend.model.Billing;
import com.example.appbackend.repository.BillingProductRepository;
import com.example.appbackend.repository.BillingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BillingService {
    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private BillingProductRepository billingProductRepository;

    public void addBilling(Billing billing) {
        billingRepository.save(billing);
        billingProductRepository.saveAll(billing.getBillingProductList());
    }
}
