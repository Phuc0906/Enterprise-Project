package com.example.appbackend.controller;

import com.example.appbackend.model.Shop;
import com.example.appbackend.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "shop")
@RequiredArgsConstructor
public class ShopController {
    @Autowired
    private ShopService shopService;

    @PostMapping
    public void addShop(@RequestBody Shop shop) {
        shopService.addShop(shop);
    }
}
