package com.example.appbackend.controller;

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


}
