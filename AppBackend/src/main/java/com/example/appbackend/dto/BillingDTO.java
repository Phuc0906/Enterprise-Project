package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class BillingDTO {
    private String customerId;
    private String shopId;
    private double totalPrice;
    private List<BillingProductDTO> products;
}
