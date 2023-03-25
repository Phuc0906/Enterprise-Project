package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InCartDTO {
    private String userId;
    private String productId;
    private String quantity;
    private String type;
}
