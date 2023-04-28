package com.example.appbackend.controller;

import com.example.appbackend.dto.InStockDTO;
import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.dto.ProductGetRequest;
import com.example.appbackend.model.*;
import com.example.appbackend.response.ProductAddResponse;
import com.example.appbackend.response.ProductAuthResponse;
import com.example.appbackend.service.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

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
    public ProductAddResponse addProduct(@RequestBody String productBody) {
        System.out.println(productBody);
        JSONObject object = new JSONObject(productBody);
        Product product = new Product(object.getString("name"), object.getString("description"), Long.valueOf(object.getInt("price")));
        Category category = categoryService.findCategoryByName(object.getString("categoryname"));
        category.addProduct(product);
        Shop shop = shopService.findShopByName(object.getString("shopname"));
        shop.addProduct(product);
        productService.addProduct(product);
        return new ProductAddResponse(product.getId().toString());
    }

    @PostMapping(
            path = "test"
    )
    public String getTest(@RequestParam("test") int digit) {
        return "hello";
    }

    @PostMapping(
            path = "{product_id}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadImage(@RequestParam("file") MultipartFile[] file, @PathVariable("product_id") Long productId) {
        Product product = productService.getProductById(productId);
        product.setImageCount(file.length);
        productService.addProduct(product);
        amazonS3Service.uploadImage(file, productId);
    }

    @PutMapping
    public void updateProduct(@RequestBody ProductDTO productDTO) throws Exception {
        productService.updateProduct(productDTO);
    }

    @PostMapping(path = "/get-products")
    public List<ProductDTO> getProduct(@RequestBody ProductGetRequest request) {
        System.out.println(request);
//        JSONObject jsonObject = new JSONObject(request);
//        JSONArray jsonCategory = jsonObject.getJSONArray("categories");
//        JSONArray jsonBrands = jsonObject.getJSONArray("brands");
//        List<Long> categories = new ArrayList<>();
//        List<Long> brands = new ArrayList<>();
//        for (int i = 0; i < jsonCategory.length(); i++) {
//            categories.add(Long.valueOf(jsonCategory.getInt(i)));
//        }
//
//        for (int i = 0; i < jsonBrands.length(); i++) {
//            brands.add(Long.valueOf(jsonBrands.getInt(i)));
//        }
//
//        if ((categories.size() != 0) && (brands.size() != 0)) {
//            return productService.getProductsByCategoriesAndBrands(
//                categories, brands
//            );
//        }
//
//        if (brands.size() != 0) {
//            return productService.getProductsByBrands(
//                    brands
//            );
//        }
//
//        if (categories.size() != 0) {
//            return productService.getProductsByCategories(
//                    categories
//            );
//        }
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
