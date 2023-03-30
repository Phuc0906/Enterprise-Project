package com.example.appbackend.controller;

import com.example.appbackend.dto.InStockDTO;
import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.model.*;
import com.example.appbackend.service.CategoryService;
import com.example.appbackend.service.InStockService;
import com.example.appbackend.service.ProductService;
import com.example.appbackend.service.ShopService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "product")
@RequiredArgsConstructor
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ShopService shopService;

    @Autowired
    private InStockService inStockService;

    @PostMapping
    public void addProduct(@RequestBody ProductDTO productDTO) {

        Product product = new Product(productDTO.getName(), productDTO.getDescription(), productDTO.getPrice());
        Category category = categoryService.findCategoryByName(productDTO.getCategoryname());
        System.out.println(productDTO.getCategoryname());
        category.addProduct(product);
        Shop shop = shopService.findShopByName(productDTO.getShopname());
        shop.addProduct(product);
        productService.addProduct(product);
    }

    @GetMapping
    public List<Product> getProduct() {
        return productService.getAllProduct();
    }

    @PostMapping(path = "/stock")
    public void addStock(@RequestBody InStockDTO inStockDTO) throws Exception {
        Product product = productService.getProductById(Long.parseLong(inStockDTO.getProductId()));
        InStock inStock = new InStock(inStockDTO.getType(), Long.parseLong(inStockDTO.getQuantity()));
        try {
            product.addStock(inStock);
            inStockService.addStock(inStock);
        }catch (Exception ex) {
            throw new Exception("Type is already exist");
        }

    }

    @GetMapping(path = "/stock")
    public List<InStock> getInStock(@RequestParam String productId) {
        Product product = productService.getProductById(Long.parseLong(productId));
        return product.getInStockList();
    }


}
