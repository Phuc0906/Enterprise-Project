package com.example.appbackend.repository;

import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Product;
import com.example.appbackend.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByProductAndAppUser(Product product, AppUser appUser);
}
