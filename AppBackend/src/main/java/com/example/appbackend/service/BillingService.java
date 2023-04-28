package com.example.appbackend.service;

import com.example.appbackend.model.Billing;
import com.example.appbackend.repository.BillingProductRepository;
import com.example.appbackend.repository.BillingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;

import java.util.List;

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

    public List<Billing> getAllBilling() {
        return billingRepository.findAll();
    }

    public List<Billing> getAllBillingByStatus(int status, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.unsorted());
        Page<Billing> page = billingRepository.findAllByStatus(status, pageable);
        return page.getContent();
    }

    public void increaseStatus(Long id) {
        int currentStatus = billingRepository.findById(id).orElseThrow().getStatus();
        billingRepository.findById(id).orElseThrow().setStatus(currentStatus+1);
    }

    public void decreaseStatus(Long id) {
        int currentStatus = billingRepository.findById(id).orElseThrow().getStatus();
        billingRepository.findById(id).orElseThrow().setStatus(currentStatus-1);
    }
}
