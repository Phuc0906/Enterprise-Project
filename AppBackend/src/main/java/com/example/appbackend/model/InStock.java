package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@Entity(name = "in_stock")
@Table(name = "in_stock")
public class InStock {
    @Id
    @GeneratedValue
    @Column(
            name = "id"
    )
    private Long id;

    @Column(
            name = "type",
            nullable = false
    )
    private String type;

    @Column(
            name = "quantity"
    )
    private Long quantity;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "product_id_stock_fk"
            )
    )
    Product product;

    public InStock(String type, Long quantity) {
        this.type = type;
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object obj) {
        InStock inStockObj = (InStock) obj;
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return Objects.equals(type, inStockObj.type);
    }
}
