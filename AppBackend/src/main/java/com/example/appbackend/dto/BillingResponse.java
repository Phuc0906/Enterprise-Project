package com.example.appbackend.dto;

import com.example.appbackend.model.BillingProduct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class BillingResponse {
    private Long id;
    private CustomerBillingDTO customer;
    private ShopDTO shop;
    private double totalPrice;
    private List<BillingProduct> products;
}
