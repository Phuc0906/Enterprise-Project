package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class DeleteCartDT0 {
    private Long productId;
    private String size;

    public DeleteCartDT0(Long productId, String size) {
        this.productId = productId;
        this.size = size;
    }
}
