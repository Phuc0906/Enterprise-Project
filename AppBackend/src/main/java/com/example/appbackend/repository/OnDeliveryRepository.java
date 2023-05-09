package com.example.appbackend.repository;

import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.OnDelivery;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OnDeliveryRepository extends JpaRepository<OnDelivery, Long> {
    Optional<OnDelivery> findByBillingAndAppUser(Billing billing, AppUser appUser);
}
