package com.legalDost.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserForm {

  
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

    private String about;
}