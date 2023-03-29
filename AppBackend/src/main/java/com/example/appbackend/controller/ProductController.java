package com.example.appbackend.controller;

import com.example.appbackend.dto.InStockDTO;
import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.model.*;
import com.example.appbackend.response.ProductAddResponse;
import com.example.appbackend.service.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = "api/product")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ShopService shopService;

    @Autowired
    private InStockService inStockService;

    @Autowired
    private AmazonS3Service amazonS3Service;

    @PostMapping()
    public ProductAddResponse addProduct(@RequestBody ProductDTO productDTO) {
        Product product = new Product(productDTO.getName(), productDTO.getDescription(), productDTO.getPrice());
        Category category = categoryService.findCategoryByName(productDTO.getCategoryname());
        System.out.println(productDTO.getCategoryname());
        category.addProduct(product);
        Shop shop = shopService.findShopByName(productDTO.getShopname());
        shop.addProduct(product);
        productService.addProduct(product);
        return new ProductAddResponse(product.getId().toString());
    }

    @PostMapping(
            path = "{product_id}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadImage(@RequestParam("file") MultipartFile[] file, @PathVariable("product_id") Long productId) {
        amazonS3Service.uploadImage(file, productId);
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
