package com.example.appbackend.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductAddRequest {
    private Long id;
    private String name;
    private String description;
    private Long price;

    private String shopname;

    private String categoryname;

    private int imagesCount;

    private int[] size;

    private double rating;

    public ProductAddRequest(String name, String description, Long price, String shopname, String categoryname, int imagesCount, int[] size,double rating) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.shopname = shopname;
        this.categoryname = categoryname;
        this.imagesCount = imagesCount;
        this.size = size;
        this.rating = rating;
    }

}
