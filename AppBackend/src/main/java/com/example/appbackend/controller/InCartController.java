package com.example.appbackend.controller;

import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.request.CartRequest;
import com.example.appbackend.service.InCartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/in-cart")
@CrossOrigin("*")
@RequiredArgsConstructor
public class InCartController {
    @Autowired
    private InCartService inCartService;

    @PostMapping
    public void addToCart(@RequestBody CartRequest request, HttpServletRequest httpRequest) {
        inCartService.addProductToCart(request, httpRequest);
    }

    @GetMapping()
    public List<InCartDTO> getUserCartProducts(HttpServletRequest request) {
        return inCartService.getUserCartProduct(request);
    }
}
