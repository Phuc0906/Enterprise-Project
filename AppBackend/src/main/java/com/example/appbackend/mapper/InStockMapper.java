package com.example.appbackend.mapper;

import com.example.appbackend.dto.InStockDTO;
import com.example.appbackend.model.InStock;

import java.util.function.Function;

public class InStockMapper implements Function<InStock, InStockDTO> {
    @Override
    public InStockDTO apply(InStock inStock) {
        return new InStockDTO(inStock.getProduct().getId(), inStock.getType(), inStock.getQuantity());
    }
}
