package com.example.appbackend.controller;

import com.example.appbackend.dto.CategoryDTO;
import com.example.appbackend.model.Category;
import com.example.appbackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "category")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public void addCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = new Category(categoryDTO.getName());
        categoryService.addCategory(category);
    }

    @GetMapping
    public List<CategoryDTO> getCategories() {
        return categoryService.getCategories();
    }
}
