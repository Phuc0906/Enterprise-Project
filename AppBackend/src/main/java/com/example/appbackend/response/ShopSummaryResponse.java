package com.example.appbackend.response;

import com.example.appbackend.dto.BillingProductResponse;
import com.example.appbackend.dto.BillingResponse;
import com.example.appbackend.model.BillingProduct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class ShopSummaryResponse {
    private LocalDate date;
    private List<BillingProduct> billingResponses;


    public ShopSummaryResponse(LocalDate date, List<BillingProduct> billingResponses) {
        this.date = date;
        this.billingResponses = billingResponses;
    }
}
