package com.legalDost.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.legalDost.entities.User;
import com.legalDost.forms.UserForm;

// import com.LegalDost.entities.user;
// import com.LegalDost.forms.UserForm;
// import com.LegalDost.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;



@Controller
public class PageController {

    // @Autowired
    // private UserService userService;

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
    public String register(Model model) {
        UserForm userForm=new UserForm();
        userForm.setUsername("Lakshya");
        model.addAttribute("userForm", userForm);
        System.out.println("register Page Handler");
        return "register";
        }
        
        @RequestMapping(value ="/do-register", method=RequestMethod.POST)
        public String processingRegister(@Valid @ModelAttribute("userForm") UserForm userForm, BindingResult bindingResult, HttpSession httpSession) {
            if(bindingResult.hasErrors()) {
                return "register";
            }

            System.out.println("Processing Register Handler");
            System.out.println(userForm);
            return "redirect:/register";
        }
        
    }