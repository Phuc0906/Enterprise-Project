package com.example.appbackend.response;

import com.example.appbackend.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
public class ProductAuthResponse {
    private List<ProductDTO> productList;

    public ProductAuthResponse(List<ProductDTO> productList) {
        this.productList = productList;
    }
}
