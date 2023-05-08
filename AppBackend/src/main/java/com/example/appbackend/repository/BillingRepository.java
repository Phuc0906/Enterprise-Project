package com.example.appbackend.repository;

import com.example.appbackend.dto.BillingResponse;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    List<Billing> findAllByStatus(int status);

    @Query(value = "select new com.example.appbackend.dto.BillingResponse(bl.id, bl.appUser, bl.shop, bl.totalPrice, bl) from billing bl where bl.appUser.phoneNumber = ?2 and bl.status = ?1")
    List<BillingResponse> getUserBilling(int status, String phoneNumber);
}
