package com.example.appbackend.mapper;

import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.dto.ShopDTO;
import com.example.appbackend.model.Product;
import com.example.appbackend.model.Shop;

import java.util.function.Function;

public class BrandMapper implements Function<Shop, ShopDTO> {


    @Override
    public ShopDTO apply(Shop shop) {
        return null;
    }
}
