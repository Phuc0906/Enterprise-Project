package com.example.appbackend.service;

import com.example.appbackend.dto.InStockDTO;
import com.example.appbackend.mapper.InStockMapper;
import com.example.appbackend.model.InStock;
import com.example.appbackend.model.Product;
import com.example.appbackend.repository.InStockRepository;
import com.example.appbackend.repository.ProductRepository;
import com.example.appbackend.request.ProductAddRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InStockService {
    @Autowired
    private InStockRepository inStockRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addStock(int[] size, Product product) {
        double minimumSize = 5.5;
        List<InStock> inStock = new ArrayList<>();
        for (int i = 0; i < size.length; i++) {
            InStock inStockObj = new InStock(Double.toString(minimumSize), Long.valueOf(size[i]));
            inStockObj.setProduct(product);
            inStock.add(inStockObj);
            minimumSize += 0.5;
        }
        inStockRepository.saveAll(inStock);
    }

    public List<InStockDTO> getStockByProduct(Long productId) throws Exception {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            return inStockRepository.findByProduct(product).stream().map(new InStockMapper()).collect(Collectors.toList());
        }else {
            throw new Exception("Product not found");
        }
    }

    public void updateStock(ProductAddRequest productAddRequest) {
        Product product = productRepository.findById(productAddRequest.getId()).orElseThrow();
        List<InStock> inStockList = new ArrayList<>();
        double minimumSize = 5.5;
        for (int i = 0; i < productAddRequest.getSize().length; i++) {
            InStock inStock = inStockRepository.findByProductAndType(product, Double.toString(minimumSize));
            inStock.setQuantity(Long.valueOf(productAddRequest.getSize()[i]));
            inStockList.add(inStock);
            minimumSize += 0.5;
        }
        inStockRepository.saveAll(inStockList);
    }
}
