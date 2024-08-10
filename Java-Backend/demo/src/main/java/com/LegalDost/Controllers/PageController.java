package com.LegalDost.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.LegalDost.entities.user;
import com.LegalDost.forms.UserForm;
import com.LegalDost.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;



@Controller
public class PageController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
        public String index() {
            return "redirect:/home";
    }

     @RequestMapping("/home")
    public String home() {
        System.out.println("Home page handler");
        // model.addAttribute("Name", "Lakshya Bhardwaj");
        return "home";
    }

    @RequestMapping("/about") 
    public String about() {
        System.out.println("About page handler");
        return "about";
    }

    @GetMapping("/login")
    public String login() {
        System.out.println("Login Page Handler");
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        System.out.println("register Page Handler");
        return "register";
        }

        @RequestMapping(value = "/do-register", method = RequestMethod.POST)
    public String processingRegister(
            @Valid @ModelAttribute("userForm") UserForm userForm,
            BindingResult bindingResult,
            HttpSession httpSession) {

        if (bindingResult.hasErrors()) {
            // If there are validation errors, return to the registration page
            return "register";
        }

        // Create a new User object and populate it with form data
        user user = new user();
        user.setUsername(userForm.getUsername());
        user.setEmail(userForm.getEmail());
        user.setFirstname(userForm.getFirstname());
        user.setPhoneNumber(userForm.getPhonenumber());
        user.setAddress(userForm.getAddress());
        user.setCity(userForm.getCity());
        user.setCountry(userForm.getCountry());
        user.setPostalCode(userForm.getPostalcode());
        user.setAbout(userForm.getAbout());

        user savedUser = userService.saveUser(user);
    
        System.out.println("user saved :");

        //add the message
    //    Message message =  Message.builder().content("Resgistration Sucessful").type(MessageType.green).build();
    //     session.setAttribute("message",  message);


        return "redirect:/register";
    }
}