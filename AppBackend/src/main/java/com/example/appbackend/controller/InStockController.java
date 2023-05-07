package com.example.appbackend.controller;

import com.example.appbackend.response.CheckStockResponse;
import com.example.appbackend.service.InStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/in-stock")
@CrossOrigin("*")
@RequiredArgsConstructor
public class InStockController {

    @Autowired
    private InStockService inStockService;

    @PostMapping
    public CheckStockResponse checkStock(@RequestParam("productId") String productId, @RequestParam("size") String size, @RequestParam("quantity") String quantity) {
        System.out.println(productId + " - " + size + " - " + quantity);
        return inStockService.checkStock(Long.parseLong(productId), size, Long.parseLong(quantity));
    }

}
