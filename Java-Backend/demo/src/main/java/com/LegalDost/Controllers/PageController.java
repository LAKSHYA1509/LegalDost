package com.LegalDost.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class PageController {

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
}
