package com.example.appbackend.service;

import com.example.appbackend.dto.CategoryDTO;
import com.example.appbackend.mapper.CategoryMapper;
import com.example.appbackend.model.Category;
import com.example.appbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public void addCategory(Category category) {
        categoryRepository.save(category);
    }

    public Category findCategoryByName(String categoryName) {
        return categoryRepository.findByName(categoryName).orElse(null);
    }

    public List<CategoryDTO> getCategories() {
        return categoryRepository.findAll().stream().map(new CategoryMapper()).collect(Collectors.toList());
    }
}
