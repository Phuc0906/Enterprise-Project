package com.example.appbackend.service;

import com.example.appbackend.dto.ShopDTO;
import com.example.appbackend.mapper.ShopDtoMapper;
import com.example.appbackend.model.Shop;
import com.example.appbackend.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<ShopDTO> getShops() {
        return shopRepository.findAll().stream().map(new ShopDtoMapper()).collect(Collectors.toList());
    }
}
