package com.example.appbackend.repository;

import com.example.appbackend.model.InStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InStockRepository extends JpaRepository<InStock, Long> {
}
