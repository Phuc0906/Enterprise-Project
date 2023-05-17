package com.example.appbackend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductRecord {
    private String productName;
    private Long totalSold;
}
