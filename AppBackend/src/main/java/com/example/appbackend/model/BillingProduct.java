package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Setter;

import java.util.Objects;

@Entity(name = "billing_product")
@Table(name = "billing_product")
@Setter
public class BillingProduct {

    @Id
    @GeneratedValue
    @Column(
            name = "id"
    )
    private Long id;

    @Column(
            name = "product_id"
    )
    private Long productId;

    @Column(
            name = "quantity"
    )
    private Long quantity;

    @Column(
            name = "type"
    )
    private String type;

    @ManyToOne
    @JoinColumn(
            name = "billing_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "billing_product_id_fk"
            )
    )
    private Billing billing;

    public BillingProduct(Long productId, Long quantity, String type) {
        this.productId = productId;
        this.quantity = quantity;
        this.type = type;
    }

    public BillingProduct() {

    }

    public Long getProductId() {
        return productId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public String getType() {
        return type;
    }

    @Override
    public boolean equals(Object obj) {
        BillingProduct billingProduct = (BillingProduct) obj;
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return Objects.equals(type, billingProduct.type) && Objects.equals(productId, billingProduct.productId);
    }
}
