package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class BillingProductDTO {
    private Long productId;
    private int quantity;
    private String size;
}
