package com.example.appbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String address;
    private String role;
    private String phoneNumber;
    private String password;

    public UserDTO(String name, String email, String address, String role, String phoneNumber, String password) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    public UserDTO(Long id, String name, String email, String address, String role, String phoneNumber, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}
