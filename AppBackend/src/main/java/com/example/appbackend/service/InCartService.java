package com.example.appbackend.service;

import com.example.appbackend.dto.DeleteCartDT0;
import com.example.appbackend.dto.InCartDTO;
import com.example.appbackend.dto.ProductDTO;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.InCart;
import com.example.appbackend.model.Product;
import com.example.appbackend.repository.InCartRepository;
import com.example.appbackend.repository.ProductRepository;
import com.example.appbackend.repository.UserRepository;
import com.example.appbackend.request.CartRequest;
import com.example.appbackend.response.InCartResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
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
        AppUser user = getUserByToken(httpRequest);
        Product product = productRepository.findById(Long.valueOf(request.getProductId())).orElse(null);
        InCart inCart = inCartRepository.getInCartByAppUserAndTypeAndProduct(user, request.getSize(), product);
        if (inCart != null) {
            inCart.setQuantity(inCart.getQuantity() + 1);
            inCartRepository.save(inCart);
            return;
        }

        if ((product != null) && (user != null)) {
            inCart = new InCart(request.getQuantity(), request.getSize());
            user.addInCart(inCart);
            product.addInCart(inCart);
            inCartRepository.save(inCart);
        }else {
            throw new IllegalStateException("Product Not Found");
        }
    }

    public List<InCartResponse> getUserCartProduct(HttpServletRequest request) {
        AppUser user = getUserByToken(request);
        if (user == null) {
            throw new IllegalStateException("User not found");
        }

        List<InCartResponse> responses = new ArrayList<>();
        List<InCartDTO> inCartDTOList = inCartRepository.getUserCartProducts(user.getId());
        HashMap<String, List<InCartDTO>> hashMap = new HashMap<>();

        String shopName = "";
        InCartResponse inCartResponse = null;
        System.out.println("Lisr: " + inCartDTOList.size());
        for (int i = 0; i < inCartDTOList.size(); i++) {
            if (!hashMap.keySet().contains(inCartDTOList.get(i).getShopName())) {
                System.out.println(inCartDTOList.get(i).getShopName());
                hashMap.put(inCartDTOList.get(i).getShopName(), new ArrayList<>());
            }
            hashMap.get(inCartDTOList.get(i).getShopName()).add(inCartDTOList.get(i));
        }

        List<String> keys = new ArrayList<>(hashMap.keySet());
        for (int i = 0; i < hashMap.size(); i++) {
            System.out.println(keys.get(i) + " - " + hashMap.get(keys.get(i)).size());
            responses.add(new InCartResponse(keys.get(i), hashMap.get(keys.get(i))));
        }

        return responses;
    }

    public void deleteCart(DeleteCartDT0 deleteCartDT0, HttpServletRequest request) {
        AppUser user = getUserByToken(request);
        Product product = productRepository.findById(deleteCartDT0.getProductId()).orElseThrow();
        if (user == null) {
            throw new IllegalStateException("User not found");
        }
        InCart inCart = inCartRepository.getInCartByAppUserAndTypeAndProduct(user, deleteCartDT0.getSize(), product);
        inCartRepository.delete(inCart);
    }
}
