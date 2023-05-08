package com.example.appbackend.dto;

import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.BillingProduct;
import com.example.appbackend.model.Shop;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
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

    public BillingResponse(Long id, AppUser customer, Shop shop, double totalPrice, Billing billing) {
        this.id = id;
        this.customer = new CustomerBillingDTO(customer);
        this.shop = new ShopDTO(shop);
        this.totalPrice = totalPrice;
        this.products = billing.getBillingProductList();
    }
}
