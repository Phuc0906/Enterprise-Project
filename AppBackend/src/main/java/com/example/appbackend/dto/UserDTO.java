package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private double point;
    private String password;


}
