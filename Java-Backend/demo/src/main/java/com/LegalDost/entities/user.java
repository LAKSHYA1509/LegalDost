package com.LegalDost.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity(name="user")
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class user {
    @Id
    private String UserId;
    // make of username,email,firstname,lastname,address,city,country,postalcode,about
    @Column(name = "user_name", nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(name = "first_name", nullable = false)
    private String firstname;
    @Column(name = "last_name", nullable = false)
    private String phonenumber;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "city", nullable = false)
    private String city;
    @Column(name = "country", nullable = false)
    private String country;
    @Column(name = "postal_code", nullable = false)
    private String postalcode;
    @Column(name = "about", nullable = false)
    private String about;
    private boolean enabled=false;
    private boolean emailVerified=false;
    private boolean phonenumberVerified=false;

    // SELF AAYA HAI YA GOOGLE YA FACEBOOK SE LOGIN KARKE
    private Providers provider = Providers.SELF;
    private String providerId;


}
