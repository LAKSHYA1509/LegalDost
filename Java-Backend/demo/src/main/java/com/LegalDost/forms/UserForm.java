package com.LegalDost.forms;

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

    @NotBlank(message = "Username is required")
    @Size(max = 100, message = "Username cannot be longer than 100 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name cannot be longer than 100 characters")
    private String firstname;

    @NotBlank(message = "Phone number is required")
    @Size (max=10, message = "Phone number should be 10 digits")
    private String phonenumber;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address cannot be longer than 255 characters")
    private String address;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot be longer than 100 characters")
    private String city;

    @NotBlank(message = "Country is required")
    @Size(max = 100, message = "Country cannot be longer than 100 characters")
    private String country;

    @NotBlank(message = "Postal code is required")
    @Size(max = 20, message = "Postal code cannot be longer than 20 characters")
    private String postalcode;

    @Size(max = 1000, message = "About section cannot be longer than 1000 characters")
    private String about;
}
