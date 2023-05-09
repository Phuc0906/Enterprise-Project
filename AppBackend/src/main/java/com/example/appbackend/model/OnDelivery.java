package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Entity(name = "on_delivery")
@Table(name = "on_delivery")
public class OnDelivery {
    @Id
    @GeneratedValue
    @Column(
            name = "id"
    )
    private Long id;

    @Column(
            name = "delivery_day"
    )
    private LocalDate deliveryDay;

    @ManyToOne
    @JoinColumn(
            name = "billing_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "billing_id_delivery_fk"
            )
    )
    private Billing billing;

    @ManyToOne
    @JoinColumn(
            name = "shipper_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "shipper_id_delivery_fk"
            )
    )
    private AppUser appUser; //shipper

    public OnDelivery() {
        deliveryDay = LocalDate.now().plusDays(3);
    }

    public LocalDate getDeliveryDay() {
        return deliveryDay;
    }

    public OnDelivery(Billing billing, AppUser appUser) {
        this.deliveryDay = LocalDate.now().plusDays(3);
        this.billing = billing;
        this.appUser = appUser;
    }
}
