package com.example.appbackend.service;

import com.example.appbackend.model.AppUser;
import com.example.appbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void register(AppUser user) {
        userRepository.save(user);
    }
}
