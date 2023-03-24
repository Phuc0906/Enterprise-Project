package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "appUser")
@Table(
        name = "appUser",
        uniqueConstraints = @UniqueConstraint(name = "email_unique", columnNames = "email")
)
public class AppUser {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private String role;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "point")
    private double point;

    @Column(name = "password")
    private String password;

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "appUser"
    )
    private List<Billing> billingList = new ArrayList<>();

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "appUser"
    )
    private List<OnDelivery> deliveryList = new ArrayList<>();

    public AppUser(String name, String email, String role, String address, String phoneNumber, String password) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.point = 0;
        this.password = password;
    }


    public AppUser() {

    }

    public void addBilling(Billing billing) {
        billingList.add(billing);
        billing.setAppUser(this);
    }

    // for shipper only
    public void addDelivery(OnDelivery onDelivery) {
        deliveryList.add(onDelivery);
        onDelivery.setAppUser(this);
    }
}
