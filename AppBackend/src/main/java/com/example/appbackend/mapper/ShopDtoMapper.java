package com.example.appbackend.mapper;

import com.example.appbackend.dto.ShopDTO;
import com.example.appbackend.model.Shop;

import java.util.function.Function;

public class ShopDtoMapper implements Function<Shop, ShopDTO> {

    @Override
    public ShopDTO apply(Shop shop) {
        return new ShopDTO(
                shop.getId(),
                shop.getName()
        );
    }
}
