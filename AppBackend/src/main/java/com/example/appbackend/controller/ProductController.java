package com.example.appbackend.controller;

import com.example.appbackend.dto.BillingProductResponse;
import com.example.appbackend.dto.InStockDTO;
import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.dto.ProductGetRequest;
import com.example.appbackend.mapper.InStockMapper;
import com.example.appbackend.model.*;
import com.example.appbackend.request.ProductAddRequest;
import com.example.appbackend.response.ProductAddResponse;
import com.example.appbackend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.*;
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
    private RatingService ratingService;

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

    @GetMapping(path = "/id/{id}")
    public ProductDTO getProductById(@PathVariable("id") String id) {
        return productService.getProductInfoById(Long.valueOf(id));
    }

    @GetMapping(path = "/billing/product")
    public List<BillingProductResponse> getProductByBilling(@RequestParam("billing") String billingId) {
        return productService.getProductsByBilling(Long.parseLong(billingId));
    }

    @PostMapping()
    public ProductAddResponse addProduct(@RequestBody ProductAddRequest productDTO) {
        Product product = new Product(productDTO.getName(), productDTO.getDescription(), productDTO.getPrice());
        Category category = categoryService.findCategoryByName(productDTO.getCategoryname());
        System.out.println(productDTO.getCategoryname());
        category.addProduct(product);
        Shop shop = shopService.findShopByName(productDTO.getShopname());
        shop.addProduct(product);
        productService.addProduct(product);
        inStockService.addStock(productDTO.getSize(), product);
        return new ProductAddResponse(product.getId().toString());
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
    public void updateProduct(@RequestBody ProductAddRequest productDTO) throws Exception {
        inStockService.updateStock(productDTO);
        productService.updateProduct(productDTO);
    }

    @PostMapping(path = "/get-products")
    public List<ProductDTO> getProduct(@RequestBody ProductGetRequest request) {
        System.out.println(request.getBrands().length + " length of brands");
        System.out.println(request.getCategories().length + " length of categories");
        List<Long> categories = new ArrayList<>();
        List<Long> brands = new ArrayList<>();
        for (int i = 0; i < request.getCategories().length; i++) {
            categories.add(Long.valueOf(request.getCategories()[i]));
        }
        for (int i = 0; i < request.getBrands().length; i++) {
            brands.add(Long.valueOf(request.getBrands()[i]));
        }
        if ((request.getBrands().length != 0) && (request.getCategories().length != 0)) {
            return productService.getProductsByCategoriesAndBrands(
                    categories, brands
            );
        }

        if (request.getBrands().length != 0) {
            return productService.getProductsByBrands(
                    brands
            );
        }

        if (request.getCategories().length != 0) {
            return productService.getProductsByCategories(
                    categories
            );
        }
        return productService.getAllProduct();
    }

    @GetMapping("/shop")
    public List<ProductDTO> getProductByShop(@RequestParam("shop") String shop) {
        return productService.getProductsByShop(shop);
    }


    @GetMapping(path = "/stock")
    public List<InStockDTO> getInStock(@RequestParam String productId) {
        Product product = productService.getProductById(Long.parseLong(productId));
        return product.getInStockList().stream().map(new InStockMapper()).collect(Collectors.toList());
    }


    @GetMapping(path = "/get")
    public List<ProductDTO> getAll() {
        return productService.getAllProduct();
    }

    @GetMapping(path = "/page/get")
    public List<ProductDTO> get(@RequestParam int page) {
        return productService.getAllProduct(page);
    }

    @PostMapping(path = "/rating/{productId}/{phone}/{rate}")
    public void rating(@PathVariable("productId") String productId, @PathVariable("phone") String phone, @PathVariable("rate") String rate) {
        ratingService.addRating(Integer.parseInt(rate), phone, Long.parseLong(productId));
    }
}
