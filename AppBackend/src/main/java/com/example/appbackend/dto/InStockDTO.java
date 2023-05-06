package com.example.appbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Setter
@Getter
@AllArgsConstructor
public class InStockDTO {
    private Long productId;
    private String type;
    private Long quantity;
}
