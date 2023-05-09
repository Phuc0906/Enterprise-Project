package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class BillingProductResponse {
    private Long productId;
    private String name;
    private String categoryname;
    private Long price;
    private int quantity;
    private String size;

    public BillingProductResponse(Long productId, String name, String categoryname, Long price, int quantity, String size) {
        this.productId = productId;
        this.name = name;
        this.categoryname = categoryname;
        this.price = price;
        this.quantity = quantity;
        this.size = size;
    }
}
