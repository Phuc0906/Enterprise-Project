package com.example.appbackend.service;

import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.mapper.ProductDtoMapper;
import com.example.appbackend.model.Category;
import com.example.appbackend.model.Product;
import com.example.appbackend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public ProductDTO getProductInfoById(Long id) {
        Product product = getProductById(id);
        if (product != null) {
            return new ProductDTO(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    product.getShop().getName(),
                    product.getCategory().getName(),
                    product.getImageCount()
            );
        }else {
            throw new IllegalStateException("Product not found");
        }
    }

    public List<ProductDTO> getAllProduct() {
        return productRepository.findAll().stream().map(new ProductDtoMapper()).collect(Collectors.toList());
    }

    public void updateProduct(ProductDTO productDTO) throws Exception {
        Product product = productRepository.findById(productDTO.getId()).orElse(null);
        Category category = categoryService.findCategoryByName(productDTO.getCategoryname());
        if (product != null) {
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            product.setCategory(category);
            productRepository.save(product);
        }else {
            throw new Exception("Product Not found");
        }
    }

    public List<ProductDTO> getProductsByCategories(List<Long> categories) {
        return productRepository.getProductsByCategories(categories).stream().map(new ProductDtoMapper()).collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByBrands(List<Long> brands) {
        return productRepository.getProductsByBrands(brands).stream().map(new ProductDtoMapper()).collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategoriesAndBrands(List<Long> categories, List<Long> brands) {
        return productRepository.getProductsByCategoriesAndBrands(categories, brands).stream().map(new ProductDtoMapper()).collect(Collectors.toList());
    }


}
