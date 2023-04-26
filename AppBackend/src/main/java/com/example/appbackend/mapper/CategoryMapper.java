package com.example.appbackend.mapper;

import com.example.appbackend.dto.CategoryDTO;
import com.example.appbackend.model.Category;

import java.util.function.Function;

public class CategoryMapper implements Function<Category, CategoryDTO> {

    @Override
    public CategoryDTO apply(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName()
        );
    }
}
