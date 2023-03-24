package com.example.appbackend.service;

import com.example.appbackend.model.InStock;
import com.example.appbackend.repository.InStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InStockService {
    @Autowired
    private InStockRepository inStockRepository;

    public void addStock(InStock inStock) {
        inStockRepository.save(inStock);
    }
}
