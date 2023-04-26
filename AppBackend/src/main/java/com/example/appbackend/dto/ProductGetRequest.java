package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductGetRequest {
    private int categories[];
    private int brands[];

    public ProductGetRequest(int categories[], int brands[]) {
        this.categories = categories;
        this.brands = brands;
    }
}
