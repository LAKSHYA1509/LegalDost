package com.legalDost.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.legalDost.entities.User;
import com.legalDost.helpers.AppConstants;
import com.legalDost.helpers.ResourceNotFoundException;
import com.legalDost.repositories.UserRepo;
import com.legalDost.services.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Logger logger=LoggerFactory.getLogger(this.getClass());

    @Override
    public User saveUser(User user) {
        String userId=UUID.randomUUID().toString();
        user.setUserId(userId);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoleList(List.of(AppConstants.ROLE_USER));
        return userRepo.save(user);
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    @Override
    public Optional<User> updateUser(User user) {
        User user2 = userRepo.findById(user.getUserId()).orElseThrow(()->new ResourceNotFoundException("Resource not found"));
        user2.setUsername(user.getUsername());
        user2.setEmail(user.getEmail());
        user2.setFirstName(user.getFirstName());
        user2.setPhoneNumber(user.getPhoneNumber());
        user2.setAddress(user.getAddress());
        user2.setCity(user.getCity());
        user2.setCountry(user.getCountry());
        user2.setPostalCode(user.getPostalCode());
        user2.setPassword(user.getPassword());
        user2.setConfirmPassword(user.getConfirmPassword());
        user2.setAbout(user.getAbout());
        user2.setEnabled(user.isEnabled());
        user2.setEmailVerified(user.isEmailVerified());
        user2.setPhoneNumberVerified(user.isPhoneNumberVerified());
        user2.setProvider(user.getProvider());
        user2.setProviderId(user.getProviderId());

        User save = userRepo.save(user2);
        return Optional.ofNullable(save);
    }

    @Override
    public void deleteUser(String id) {
        User user2 = userRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepo.delete(user2);
    }

    @Override
    public boolean isUserExist(String userId) {
        User user2 = userRepo.findById(userId).orElse(null);
        return user2 != null ? true : false;
    }

    @Override
    public boolean isUserExistByEmail(String email) {
        User user = userRepo.findByEmail(email).orElse(null);
        return user != null ? true : false;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);

    }

}