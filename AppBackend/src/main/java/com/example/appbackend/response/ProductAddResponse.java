package com.example.appbackend.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ProductAddResponse {
    private String product_id;

    public ProductAddResponse(String product_id) {
        this.product_id = product_id;
    }
}
