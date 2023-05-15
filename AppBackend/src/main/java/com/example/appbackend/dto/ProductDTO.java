package com.example.appbackend.dto;

import com.example.appbackend.model.Rating;
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

    private int rating;

    public ProductDTO(Long id, String name, String description, Long price, String shopname, String categoryname, int imagesCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.shopname = shopname;
        this.categoryname = categoryname;
        this.imagesCount = imagesCount;
    }

    public ProductDTO(String name, String description, Long price, String shopname, String categoryname) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.shopname = shopname;
        this.categoryname = categoryname;
        this.imagesCount = 0;
    }

    public ProductDTO(Long id, String name, String description, Long price, String shopname, String categoryname, int imagesCount, List<Rating> ratings) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.shopname = shopname;
        this.categoryname = categoryname;
        this.imagesCount = imagesCount;
        if (ratings.size() != 0) {
            int totalRating = 0;
            for (int i = 0; i < ratings.size(); i++) {
                totalRating += ratings.get(i).getRating();
            }
            this.rating = totalRating/ratings.size();
        }else {
            this.rating = -1;
        }

    }
}
