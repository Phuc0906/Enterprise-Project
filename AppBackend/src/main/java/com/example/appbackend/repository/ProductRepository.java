package com.example.appbackend.repository;

import com.example.appbackend.dto.BillingProductResponse;
import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.model.Product;
import com.example.appbackend.model.Shop;
import com.example.appbackend.response.ProductRecord;
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

    @Query("select pr from product pr where pr.category.id in ?1 and pr.shop.id in ?2")
    List<Product> getProductsByCategoriesAndBrands(List<Long> categories, List<Long> brands);

    @Query(value = "select new com.example.appbackend.dto.BillingProductResponse(pr.id, pr.name, pr.category.name, pr.price, bp.quantity, bp.size) from product pr, billing_product bp where pr.id = bp.productId  and bp.billing.id = ?1")
    List<BillingProductResponse> getProductsByBilling(Long billingId);

    List<Product> getProductsByShop(Shop shop);

    @Query("select new com.example.appbackend.response.ProductRecord(pr.name, sum(blp.quantity)) from product pr, billing_product blp, billing bl where bl.id = blp.billing.id and blp.productId = pr.id and bl.status = ?1 and bl.shop.name = ?2 group by pr.name")
    List<ProductRecord> getRecordsOfShop(int status, String shopName);
}
