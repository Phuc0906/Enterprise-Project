package com.example.appbackend.service;

import com.example.appbackend.model.Category;
import com.example.appbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
