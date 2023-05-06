package com.example.appbackend.repository;

import com.example.appbackend.model.InStock;
import com.example.appbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InStockRepository extends JpaRepository<InStock, Long> {
    List<InStock> findByProduct(Product product);

    InStock findByProductAndType(Product product, String type);
}
