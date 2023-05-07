package com.example.appbackend.repository;

import com.example.appbackend.model.Billing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;


@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    List<Billing> findAllByStatus(int status);
}
