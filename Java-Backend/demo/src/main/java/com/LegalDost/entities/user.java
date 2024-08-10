package com.LegalDost.entities;

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
public class user {
    @Id
    private String userId;

    @Column(name = "user_name", nullable = false, length = 1000)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "first_name", nullable = false)
    private String firstname;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "address", nullable = false, length = 1000)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "postal_code", nullable = false)
    private String postalCode;

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

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

}