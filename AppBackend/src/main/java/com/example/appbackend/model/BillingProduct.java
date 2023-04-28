package com.example.appbackend.model;

import com.example.appbackend.dto.BillingProductDTO;
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
    private int quantity;

    @Column(
            name = "size"
    )
    private int size;

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

    public BillingProduct(Long productId, int quantity, int size) {
        this.productId = productId;
        this.quantity = quantity;
        this.size = size;
    }

    public BillingProduct(BillingProductDTO  billingProductDTO) {
        this.productId = billingProductDTO.getProductId();
        this.quantity = billingProductDTO.getQuantity();
        this.size = billingProductDTO.getSize();
    }

    public BillingProduct() {

    }

    public Long getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getSize() {
        return size;
    }

    @Override
    public boolean equals(Object obj) {
        BillingProduct billingProduct = (BillingProduct) obj;
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return Objects.equals(size, billingProduct.size) && Objects.equals(productId, billingProduct.productId);
    }
}
