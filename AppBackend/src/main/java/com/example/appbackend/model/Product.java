package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity(name = "product")
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(
            name = "name",
            nullable = false
    )
    private String name;

    @Column(
            name = "description",
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(
            name = "image_count"
    )
    private int imageCount;

    @Column(
            name = "price",
            nullable = false
    )
    private Long price;

    @Column(
            name = "rating",
            nullable = false
    )
    private double rating;

    @ManyToOne
    @JoinColumn(
            name = "category_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "category_fk"
            )
    )
    private Category category;

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "product"
    )
    List<Rating> ratings = new ArrayList<>();

    @ManyToOne
    @JoinColumn(
            name = "shop_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "shop_fk"
            )
    )
    private Shop shop;

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "product"
    )
    private List<InStock> inStockList = new ArrayList<>();

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "product"
    )
    private List<InCart> inCarts = new ArrayList<>();

    public Product(String name, String description, Long price, double rating) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.rating = rating;
    }

    public Product() {

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Long getPrice() {
        return price;
    }

    public double getRating() {
        return rating;
    }

    public List<InStock> getInStockList() {
        return inStockList;
    }

    public void addStock(InStock inStock) throws Exception {
        if (!inStockList.contains(inStock)) {
            inStockList.add(inStock);
            inStock.setProduct(this);
        }else {
            throw new Exception("Stock type is already exist");
        }
    }

    public int getImageCount() {
        return imageCount;
    }

    public void addInCart(InCart inCart) {
        inCarts.add(inCart);
        inCart.setProduct(this);
    }

    public void addRating(Rating rating) {
        this.ratings.add(rating);
        rating.setProduct(this);
    }


    @Override
    public String toString() {
        return id + " - " + name;
    }
}
