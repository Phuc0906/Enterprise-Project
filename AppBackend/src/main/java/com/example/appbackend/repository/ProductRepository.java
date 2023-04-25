package com.example.appbackend.repository;

import com.example.appbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select pr from product pr where pr.category.id in ?1")
    List<Product> getProductsByCategories(List<Long> categories);

    @Query("select pr from product pr where pr.shop.id in ?1")
    List<Product> getProductsByBrands(List<Long> brands);
}
