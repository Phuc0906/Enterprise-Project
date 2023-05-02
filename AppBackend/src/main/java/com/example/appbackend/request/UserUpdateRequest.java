package com.example.appbackend.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserUpdateRequest {
    private String fullName;
    private String phoneNumber;
    private String address;
    private String email;
}
