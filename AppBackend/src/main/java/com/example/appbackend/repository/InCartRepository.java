package com.example.appbackend.repository;

import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.model.InCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InCartRepository extends JpaRepository<InCart, Long> {

    @Query("select new com.example.appbackend.dto.InCartDTO(pr.id, pr.name, pr.price, pr.category.name, pr.shop.name, ic.type, ic.quantity) from in_cart ic, product pr where ic.product.id = pr.id and ic.appUser.id = ?1")
    List<InCartDTO> getUserCartProducts(Long userId);

}
