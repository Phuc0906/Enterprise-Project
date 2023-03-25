package com.example.appbackend.service;

import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.InCart;
import com.example.appbackend.model.InCartId;
import com.example.appbackend.model.Product;
import com.example.appbackend.repository.InCartRepository;
import com.example.appbackend.repository.ProductRepository;
import com.example.appbackend.repository.UserRepository;
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

    public void register(AppUser user) {
        userRepository.save(user);
    }

    public void addToCart(InCartDTO inCartDTO) throws Exception {
        Product product = productRepository.findById(Long.parseLong(inCartDTO.getProductId())).orElse(null);
        AppUser user = userRepository.findById(Long.parseLong(inCartDTO.getUserId())).orElse(null);
        if (product != null && user != null) {
            InCart cart = new InCart(Long.parseLong(inCartDTO.getQuantity()), inCartDTO.getType());
            product.addInCart(cart);
            user.addInCart(cart);
            cart.setProduct(product);
            cart.setAppUser(user);
            inCartRepository.save(cart);
        }else {
            throw new Exception("Invalid argument");
        }
    }

    public List<InCart> getCartProduct(Long userId) throws Exception {
        AppUser user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getInCarts();
        }else {
            throw new Exception("No user found");
        }
    }
}
