package com.example.appbackend.repository;

import com.example.appbackend.model.BillingProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillingProductRepository extends JpaRepository<BillingProduct, Long> {
}
