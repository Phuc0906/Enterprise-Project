package com.example.appbackend.mapper;

import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.model.Product;

import java.util.function.Function;

public class ProductDtoMapper implements Function<Product, ProductDTO> {
    @Override
    public ProductDTO apply(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getShop().getName(),
                product.getCategory().getName(),
                product.getImageCount()
        );
    }
}
