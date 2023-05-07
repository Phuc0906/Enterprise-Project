package com.example.appbackend.dto;

import com.example.appbackend.model.Shop;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ShopDTO {
    private Long id;
    String name;

    public ShopDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ShopDTO(Shop shop) {
        this.id = shop.getId();
        this.name = shop.getName();
    }
}
