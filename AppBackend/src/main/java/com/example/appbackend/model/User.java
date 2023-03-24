package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "User")
@Table(
        name = "user_table",
        uniqueConstraints = @UniqueConstraint(name = "email_unique", columnNames = "email")
)
public class User {
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

    public User(String name, String email, String role, String address, String phoneNumber, double point, String password) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.point = point;
        this.password = password;
    }


    public User() {

    }



}
