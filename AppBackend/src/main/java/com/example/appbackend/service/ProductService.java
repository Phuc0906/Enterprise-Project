package com.example.appbackend.service;

import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.mapper.ProductDtoMapper;
import com.example.appbackend.model.Product;
import com.example.appbackend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }



    public List<ProductDTO> getAllProduct() {
        return productRepository.findAll().stream().map(new ProductDtoMapper()).collect(Collectors.toList());
    }
}
