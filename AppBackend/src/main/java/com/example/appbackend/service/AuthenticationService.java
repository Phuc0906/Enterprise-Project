package com.example.appbackend.service;

import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.dto.UserDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Role;
import com.example.appbackend.model.Shop;
import com.example.appbackend.repository.InCartRepository;
import com.example.appbackend.repository.ShopRepository;
import com.example.appbackend.repository.UserRepository;
import com.example.appbackend.request.AuthenticationRequest;
import com.example.appbackend.request.PasswordChangedRequest;
import com.example.appbackend.request.RegisterRequest;
import com.example.appbackend.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;

    @Autowired
    private InCartRepository inCartRepository;

    @Autowired
    private ShopRepository shopRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getPhoneNumber(),
                            request.getPassword()
                    )
            );
        }catch (Exception ex) {
            throw new IllegalStateException("Invalid password or username");
        }
        var user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseThrow();

        List<InCartDTO> cartDTOS = inCartRepository.getUserCartProducts(user.getId());

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .role(user.getRole().name())
                .profile(new UserDTO(user.getId() , user.getName(), user.getEmail(), user.getAddress(), user.getRole().name(), user.getPhoneNumber(), user.getPassword()))
                .cartProducts(cartDTOS.size())
                .build();
    }

    public AuthenticationResponse register(UserDTO request) {
        Role role = null;
        if (request.getRole().equals("USER")) {
            role = Role.USER;
        }else if (request.getRole().equals("SHOP")) {
            Shop shop = new Shop(request.getName(), request.getEmail());
            shopRepository.save(shop);
            role = Role.SHOP;
        }else {
            role = Role.SHIPPER;
        }

        var user = AppUser.builder()
                .name(request.getName())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .role(user.getRole().name())
                .profile(new UserDTO(user.getName(), user.getEmail(), user.getAddress(), user.getRole().name(), user.getPhoneNumber(), user.getPassword()))
                .build();
    }

}
