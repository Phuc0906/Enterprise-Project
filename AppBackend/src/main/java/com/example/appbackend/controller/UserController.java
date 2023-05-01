package com.example.appbackend.controller;

import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.dto.UserDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.InCart;
import com.example.appbackend.model.InCartId;
import com.example.appbackend.service.BillingService;
import com.example.appbackend.service.UserService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.annotations.OpenAPI30;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/user")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;
    
//    @PostMapping(path = "/register")
//    public void register(@RequestBody UserDTO user) {
//        userService.register(new AppUser(user.getName(), user.getEmail(), "USER", user.getAddress(), user.getPhoneNumber(), user.getPassword()));
//    }

    @PostMapping(path = "/cart")
    public void addToCart(@RequestBody InCartDTO inCartDTO) throws Exception {
        userService.addToCart(inCartDTO);

    }

    @GetMapping(path = "/cart")
    public List<InCart> getCartProducts(@RequestParam String userId) throws Exception {
        return userService.getCartProduct(Long.parseLong(userId));
    }
}
