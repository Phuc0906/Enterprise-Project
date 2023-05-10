package com.example.appbackend.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Long price;

    private String shopname;

    private String categoryname;

    private int imagesCount;
    private double rating;

    public ProductDTO(Long id, String name, String description, Long price, String shopname, String categoryname, int imagesCount, double rating) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.shopname = shopname;
        this.categoryname = categoryname;
        this.imagesCount = imagesCount;
        this.rating = rating;
    }

    public ProductDTO(String name, String description, Long price, String shopname, String categoryname, double rating) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.shopname = shopname;
        this.categoryname = categoryname;
        this.imagesCount = 0;
        this.rating = rating;
    }
}
