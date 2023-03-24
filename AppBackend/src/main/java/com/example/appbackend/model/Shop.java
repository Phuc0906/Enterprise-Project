package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "shop")
@Table(name = "shop")
public class Shop {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "rating")
    private double rating;

    @Column(
            name = "email",
            nullable = false
    )
    private String email;

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "shop"
    )
    private List<Product> products = new ArrayList<>();

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "shop"
    )
    private List<Billing> billingList = new ArrayList<>();

    public Shop(String name, String email) {
        this.name = name;
        this.rating = 0;
        this.email = email;
    }

    public Shop() {

    }

    public void addProduct(Product product) {
        products.add(product);
        product.setShop(this);
    }

    public void addBilling(Billing billing) {
        billingList.add(billing);
        billing.setShop(this);
    }
}
