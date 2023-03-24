package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductDTO {
    private String name;
    private String description;
    private Long price;

    private String shopname;

    private String categoryname;

}
