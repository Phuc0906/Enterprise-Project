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

    @Query(value = "select new com.example.appbackend.dto.BillingResponse(bl.id, bl.appUser, bl.shop, bl.totalPrice, bl, bl.buyDate, bl.status) from billing bl where bl.appUser.phoneNumber = ?2 and bl.status = ?1")
    List<BillingResponse> getUserBilling(int status, String phoneNumber);

    @Query(value = "select new com.example.appbackend.dto.BillingResponse(bl.id, bl.appUser, bl.shop, bl.totalPrice, bl, bl.buyDate, bl.status) from billing bl, on_delivery od where bl.status = ?1 and od.billing.id = bl.id and od.appUser.phoneNumber = ?2")
    List<BillingResponse> getShipperBilling(int status, String phoneNumber);

    @Query(value = "select new com.example.appbackend.dto.BillingResponse(bl.id, bl.appUser, bl.shop, bl.totalPrice, bl, bl.buyDate, bl.status) from billing bl where bl.shop.id = ?2 and bl.status = ?1")
    List<BillingResponse> getShopBilling(int status, Long shopId);


    @Query("select new com.example.appbackend.dto.BillingResponse(bl.id, bl.appUser, bl.shop, bl.totalPrice, bl, bl.buyDate, bl.status) from billing bl where bl.shop.id = ?1")
    List<BillingResponse> getAllBillings(Long shopId);

    @Query("select blp.productId  from billing bl, billing_product blp where blp.billing.id = bl.id and blp.productId = ?1 and bl.appUser.phoneNumber = ?2")
    List<Long> getProductsByProductId(Long productId, String phoneNumber);

}
