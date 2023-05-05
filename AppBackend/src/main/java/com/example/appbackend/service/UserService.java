package com.example.appbackend.service;

import com.example.appbackend.dto.UserDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.InCart;
import com.example.appbackend.model.Product;
import com.example.appbackend.repository.InCartRepository;
import com.example.appbackend.repository.ProductRepository;
import com.example.appbackend.repository.UserRepository;
import com.example.appbackend.request.UserUpdateRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InCartRepository inCartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private final JwtService jwtService;

    public void register(AppUser user) {
        userRepository.save(user);
    }

    public List<InCart> getCartProduct(Long userId) throws Exception {
        AppUser user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getInCarts();
        }else {
            throw new Exception("No user found");
        }
    }

    public UserDTO getUserByToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        String jwt = authHeader.substring(7);
        String phoneNumber = jwtService.extractPhoneNumber(jwt);
        AppUser user = userRepository.findByPhoneNumber(phoneNumber).orElse(null);
        if (user != null) {
            return new UserDTO(
                    user.getName(),
                    user.getEmail(),
                    user.getAddress(),
                    user.getRole().name(),
                    user.getPhoneNumber(),
                    user.getPassword()
            );
        }else {
            throw new IllegalStateException("User not found");
        }
    }

    public void updateInformation(UserUpdateRequest request, HttpServletRequest httpRequest) {
        final String authHeader = httpRequest.getHeader("Authorization");
        String jwt = authHeader.substring(7);
        String phoneNumber = jwtService.extractPhoneNumber(jwt);
        AppUser user = userRepository.findByPhoneNumber(phoneNumber).orElse(null);
        if (user == null) {
            throw new IllegalStateException("User not found");
        }
        user.setAddress(request.getAddress());
        user.setEmail(request.getEmail());
        user.setName(request.getFullName());
        if (!phoneNumber.equals(request.getPhoneNumber())) {
            // check if phone number exist
            AppUser userValidation = userRepository.findByPhoneNumber(request.getPhoneNumber()).orElse(null);
            if (userValidation == null) {
                // update phone number
                user.setPhoneNumber(request.getPhoneNumber());
            }
        }
        userRepository.save(user);
    }
}
