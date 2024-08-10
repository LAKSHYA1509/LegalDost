package com.LegalDost.services.impl;

import org.apache.catalina.User;
import org.hibernate.validator.constraints.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.LegalDost.entities.user;
import com.LegalDost.services.UserService;

@Service
public class UserServiceimpl implements UserService{

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Override
    public user saveUser(user user) {
        String userId=UUID.randomUUID().toString();
        user.setUserId(userId);
        user.setPassword(PasswordEncoder.encode(user.getPassword()));
    }
}
