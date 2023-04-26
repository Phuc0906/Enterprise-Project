package com.example.appbackend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity(name = "appUser")
@Table(
        name = "appUser",
        uniqueConstraints = @UniqueConstraint(name = "email_unique", columnNames = "email")
)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppUser implements UserDetails {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

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

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "appUser"
    )
    private List<InCart> inCarts = new ArrayList<>();


    public void addBilling(Billing billing) {
        billingList.add(billing);
        billing.setAppUser(this);
    }

    // for shipper only
    public void addDelivery(OnDelivery onDelivery) {
        deliveryList.add(onDelivery);
        onDelivery.setAppUser(this);
    }

    public void addInCart(InCart inCart) {
        inCarts.add(inCart);
        inCart.setAppUser(this);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return phoneNumber;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
