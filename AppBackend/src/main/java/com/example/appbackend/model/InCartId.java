package com.example.appbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class InCartId implements Serializable {
    @Column(
            name = "user_id"
    )
    private Long userId;

    @Column(
            name = "product_id"
    )
    private Long productId;

    public InCartId(Long userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
    }

    public InCartId() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InCartId that = (InCartId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, productId);
    }


}
