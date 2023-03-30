package com.example.appbackend.controller;

import com.example.appbackend.dto.BillingDTO;
import com.example.appbackend.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "billing")
@RequiredArgsConstructor
public class BillingController {
    @Autowired
    private BillingService billingService;

    @PostMapping
    public void addBilling(@RequestBody BillingDTO billingDTO) {

    }
}
