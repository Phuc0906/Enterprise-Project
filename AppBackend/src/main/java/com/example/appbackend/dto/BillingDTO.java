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
    private Long customerId;
    private Long shopId;
    private double totalPrice;
    private List<BillingProductDTO> products;
}
