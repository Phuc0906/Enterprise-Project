package com.example.appbackend.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PasswordChangedRequest {
    private String phoneNumber;
    private String currentPassword;
    private String newPassword;
}
