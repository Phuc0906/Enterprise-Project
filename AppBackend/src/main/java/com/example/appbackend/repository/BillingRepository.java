package com.example.appbackend.repository;

import com.example.appbackend.dto.BillingResponse;
import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.model.Billing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;


@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    List<Billing> findAllByStatus(int status);

    @Query(value = "select new com.example.appbackend.dto.BillingResponse(bl.id, bl.appUser, bl.shop, bl.totalPrice, bl.billingProductList ) from billing bl where bl.appUser.phoneNumber = ?2 and bl.status = ?1")
    List<BillingResponse> getUserBilling(int status, String phoneNumber);
}
