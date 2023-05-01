package com.example.appbackend.model;

import com.example.appbackend.dto.BillingProductDTO;
import jakarta.persistence.*;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "billing")
@Table(name = "billing")
@Setter
public class Billing {
    @Id
    @GeneratedValue
    @Column(
            name = "id"
    )
    private Long id;

    @Column(
            name = "total_price"
    )
    private double totalPrice;

    @Column(
            name = "status"
    )
    private int status; // 0: on process, 1: wait for shipper, 2: on delivery, 3: delivered

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "user_billing_fk"
            )
    )
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(
            name = "shop_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "shop_billing_fk"
            )
    )
    private Shop shop;

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "billing"
    )
    private List<OnDelivery> deliveryList = new ArrayList<>();

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "billing"
    )
    private List<BillingProduct> billingProductList = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public int getStatus() {
        return status;
    }

    public List<BillingProduct> getBillingProductList() {
        return billingProductList;
    }

    public void addProduct(BillingProduct billingProduct) {
        if (!billingProductList.contains(billingProduct)) {
            billingProductList.add(billingProduct);
            billingProduct.setBilling(this);
        }
    }

    public void toDelivery(OnDelivery onDelivery) {
        deliveryList.add(onDelivery);
        onDelivery.setBilling(this);
    }
}
