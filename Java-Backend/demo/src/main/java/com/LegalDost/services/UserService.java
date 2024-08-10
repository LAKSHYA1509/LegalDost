package com.LegalDost.services;

import com.LegalDost.entities.user;
import java.util.List;
import java.util.Optional;

public interface UserService {

    user saveUser(user user);

    Optional<user> getUserById(String id);

    Optional<user> getUserByEmail(String email);

    void deleteUser(String id);

    boolean isUserExist(String userId);

    boolean isUserExistByEmail(String email);

    List<user> getAllUsers();

    // Add more methods here as needed
}
