package com.example.appbackend.service;

import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Product;
import com.example.appbackend.model.Rating;
import com.example.appbackend.repository.ProductRepository;
import com.example.appbackend.repository.RatingRepository;
import com.example.appbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingService {
    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public void addRating(int rate, String phoneNumber, Long productId) {
        AppUser appUser = userRepository.findByPhoneNumber(phoneNumber).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        Rating rating = ratingRepository.findByProductAndAppUser(product, appUser).orElse(null);
        if (rating == null) {
            rating = new Rating(rate);
            appUser.addRating(rating);
            product.addRating(rating);
        }else {
            rating.setRating(rate);
        }
        ratingRepository.save(rating);
    }
}
