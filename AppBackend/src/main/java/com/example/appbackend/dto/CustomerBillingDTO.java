package com.example.appbackend.dto;

import com.example.appbackend.model.AppUser;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CustomerBillingDTO {
    private Long id;
    private String name;
    private String address;
    private String PhoneNumber;

    public CustomerBillingDTO(AppUser customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.address = customer.getAddress();
        this.PhoneNumber = customer.getPhoneNumber();
    }
}
