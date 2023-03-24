package com.example.appbackend.controller;

import com.example.appbackend.model.AppUser;
import com.example.appbackend.service.BillingService;
import com.example.appbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;


    @PostMapping(path = "/register")
    public void register(@RequestBody AppUser user) {
        userService.register(user);
    }
}
