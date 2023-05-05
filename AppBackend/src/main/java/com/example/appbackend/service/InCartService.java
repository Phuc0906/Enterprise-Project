package com.example.appbackend.service;

import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.InCart;
import com.example.appbackend.model.Product;
import com.example.appbackend.repository.InCartRepository;
import com.example.appbackend.repository.ProductRepository;
import com.example.appbackend.repository.UserRepository;
import com.example.appbackend.request.CartRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InCartService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InCartRepository inCartRepository;

    @Autowired
    private JwtService jwtService;

    private AppUser getUserByToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt = authHeader.substring(7);
        String phoneNumber = jwtService.extractPhoneNumber(jwt);
        return userRepository.findByPhoneNumber(phoneNumber).orElse(null);
    }

    public void addProductToCart(CartRequest request, HttpServletRequest httpRequest) {
        System.out.println("Given id: " + request.getProductId());
        System.out.println("Quantity: " + request.getQuantity());
        System.out.println("Size: " + request.getSize());

        AppUser user = getUserByToken(httpRequest);

        Product product = productRepository.findById(Long.valueOf(request.getProductId())).orElse(null);
        if ((product != null) && (user != null)) {
            InCart inCart = new InCart(request.getQuantity(), request.getSize());
            user.addInCart(inCart);
            product.addInCart(inCart);
            inCartRepository.save(inCart);
        }else {
            throw new IllegalStateException("Product Not Found");
        }
    }

    public List<InCartDTO> getUserCartProduct(HttpServletRequest request) {
        AppUser user = getUserByToken(request);
        if (user == null) {
            throw new IllegalStateException("User not found");
        }
        return inCartRepository.getUserCartProducts(user.getId());
    }
}
