package com.example.appbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private String address;
    private String role;
    private String phoneNumber;
    private String password;


}
