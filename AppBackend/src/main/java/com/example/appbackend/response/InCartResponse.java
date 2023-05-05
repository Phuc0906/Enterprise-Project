package com.example.appbackend.response;

import com.example.appbackend.dto.InCartDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class InCartResponse {
    private String shopName;
    private List<InCartDTO> productList;

    public InCartResponse(String shopName) {
        this.shopName = shopName;
        productList = new ArrayList<>();
    }

    public void addProduct(InCartDTO inCartDTO) {
        productList.add(inCartDTO);
    }

    public InCartResponse(String shopName, List<InCartDTO> productList) {
        this.shopName = shopName;
        this.productList = productList;
    }
}
