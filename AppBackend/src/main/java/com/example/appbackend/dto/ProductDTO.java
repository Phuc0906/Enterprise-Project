package com.example.appbackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
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

    public ProductDTO(Long id, String name, String description, Long price, String shopname, String categoryname) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.shopname = shopname;
        this.categoryname = categoryname;
    }
}
