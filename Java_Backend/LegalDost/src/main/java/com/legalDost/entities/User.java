package com.legalDost.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "user")
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String userId;

    private String username;

    private String email;

    private String firstName;

    private String phoneNumber;

    private String address;

    private String city;

    private String country;

    private String postalCode;

    private String password;
    private String confirmPassword;

    @Column(name = "about", length = 1000)
    private String about;

    @Getter(value = AccessLevel.NONE)
    private boolean enabled = false;
    private boolean emailVerified = false;
    private boolean phoneNumberVerified = false;

    // SELF AAYA HAI YA GOOGLE YA FACEBOOK SE LOGIN KARKE
    @Enumerated(EnumType.STRING)
    private Providers provider = Providers.SELF;

    private String providerId;

}