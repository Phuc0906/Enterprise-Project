package com.example.appbackend.service;

import com.example.appbackend.model.Shop;
import com.example.appbackend.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShopService {
    @Autowired
    private ShopRepository shopRepository;

    public void addShop(Shop shop) {
        shopRepository.save(shop);
    }

    public Shop findShopByName(String shopName) {
        return shopRepository.findByName(shopName).orElse(null);
    }
}
