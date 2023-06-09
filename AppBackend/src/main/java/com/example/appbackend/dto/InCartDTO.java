package com.example.appbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InCartDTO {
    private Long productId;
    private String productName;
    private Long productPrice;
    private String categoryName;
    private String shopName;
    private String size;
    private Long quantity;

    public InCartDTO(Long productId, String productName, Long productPrice, String categoryName, String shopName, String size, Long quantity) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.categoryName = categoryName;
        this.shopName = shopName;
        this.size = size;
        this.quantity = quantity;
    }
}
