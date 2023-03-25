package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Entity(name = "in_cart")
@Table(name = "in_cart")
public class InCart {
    @Id
    @GeneratedValue
    @Column(
            name = "id"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(
                    name = "user_id_in_cart_fk"
            )
    )
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            foreignKey = @ForeignKey(
                    name = "product_id_in_cart_fk"
            )
    )
    private Product product;

    @Column(
            name = "quantity"
    )
    private Long quantity;

    @Column(
            name = "type"
    )
    private String type;

    public InCart(Long quantity, String type) {
        this.quantity = quantity;
        this.type = type;
    }

    public Long getQuantity() {
        return quantity;
    }

    public String getType() {
        return type;
    }

    public InCart() {

    }
}
