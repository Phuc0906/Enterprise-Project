package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class BillingDTO {
    private Long id;
    private String customerPhoneNumber;
    private String shopName;
    private double totalPrice;
    private BillingProductDTO[] products;
}
