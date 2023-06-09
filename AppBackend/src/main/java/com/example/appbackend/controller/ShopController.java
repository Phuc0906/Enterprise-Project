package com.example.appbackend.controller;

import com.example.appbackend.dto.ShopDTO;
import com.example.appbackend.model.Shop;
import com.example.appbackend.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/shop")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ShopController {
    @Autowired
    private ShopService shopService;

    @PostMapping
    public void addShop(@RequestBody Shop shop) {
        shopService.addShop(shop);
    }

    @GetMapping
    public List<ShopDTO> getShops() {
        return shopService.getShops();
    }
}
