package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity(name = "rating")
@Table(name = "rating")
public class Rating {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "rate")
    private int rating;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "rating_product_fk"
            )
    )
    private Product product;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "rating_user_fk"
            )
    )
    private AppUser appUser;

    public Rating(int rating) {
        this.rating = rating;
    }

    public Rating() {

    }
}
