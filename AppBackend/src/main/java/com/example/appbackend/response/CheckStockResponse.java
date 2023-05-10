package com.example.appbackend.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CheckStockResponse {
    public Long left;

    public CheckStockResponse(Long left) {
        this.left = left;
    }
}
