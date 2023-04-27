package com.example.appbackend.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class BrandDTO {
    private Long id;
    private String name;

    public BrandDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
