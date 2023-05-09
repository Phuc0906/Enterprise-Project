package com.example.appbackend.service;

import com.amazonaws.services.mediapackage.model.AdsOnDeliveryRestrictions;
import com.example.appbackend.model.AppUser;
import com.example.appbackend.model.Billing;
import com.example.appbackend.model.OnDelivery;
import com.example.appbackend.repository.BillingRepository;
import com.example.appbackend.repository.OnDeliveryRepository;
import com.example.appbackend.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OnDeliveryService {
    @Autowired
    private OnDeliveryRepository onDeliveryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BillingRepository billingRepository;

    public void save(Long id, String phoneNumber) {
        AppUser user = userRepository.findByPhoneNumber(phoneNumber).orElse(null);
        Billing billing = billingRepository.findById(id).orElse(null);
        OnDelivery onDelivery = new OnDelivery(billing, user);
        onDeliveryRepository.save(onDelivery);
    }

    public void delete(Long id, String phoneNumber) {
        AppUser user = userRepository.findByPhoneNumber(phoneNumber).orElse(null);
        Billing billing = billingRepository.findById(id).orElse(null);
        OnDelivery onDelivery = onDeliveryRepository.findByBillingAndAppUser(billing, user).orElse(null);
        onDeliveryRepository.delete(onDelivery);
    }

}
