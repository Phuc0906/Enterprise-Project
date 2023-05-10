package com.example.appbackend.repository;

import com.example.appbackend.model.Category;
import com.example.appbackend.response.ProductRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

    @Query("select new com.example.appbackend.response.ProductRecord(pr.category.name, sum(blp.quantity)) from product pr, billing_product blp, billing bl where bl.id = blp.billing.id and blp.productId = pr.id and bl.status = ?1 and bl.shop.name = ?2 group by pr.category.name")
    List<ProductRecord> getCategoryRecord(int status, String shopName);

}
