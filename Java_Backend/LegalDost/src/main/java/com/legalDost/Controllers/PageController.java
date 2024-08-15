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
import com.legalDost.helpers.Message;
import com.legalDost.helpers.MessageType;
import com.legalDost.entities.User;
import com.legalDost.forms.UserForm;
import com.legalDost.services.UserService;
import com.legalDost.helpers.Message;

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
        System.out.println("login page handler");
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        UserForm userForm=new UserForm();
        // userForm.setUsername("Lakshya");
        // userForm.setEmail("abc@gmail.com");
        // userForm.setFirstName("Lakshya");
        // userForm.setPhoneNumber("9999999999");
        // userForm.setAddress("abc");
        // userForm.setCity("abc");
        // userForm.setCountry("abc");
        // userForm.setPostalCode("12345");
        // userForm.setPassword("12345");
        // userForm.setConfirmPassword("12345");
        // userForm.setAbout("heya it's me");
        model.addAttribute("userForm", userForm);
        System.out.println("register Page Handler");
        return "register";
        }
        
        @RequestMapping(value ="/do-register", method=RequestMethod.POST)
        public String processingRegister(@Valid @ModelAttribute("userForm") UserForm userForm, BindingResult bindingResult, HttpSession session) {
            if(bindingResult.hasErrors()) {
                return "register";
            }

            System.out.println("Processing Register Handler");
            System.out.println(userForm);

            User user = new User();
            user.setUsername(userForm.getUsername());
            user.setEmail(userForm.getEmail());
            user.setFirstName(userForm.getFirstName());
            user.setPhoneNumber(userForm.getPhoneNumber());
            user.setAddress(userForm.getAddress());
            user.setCity(userForm.getCity());
            user.setCountry(userForm.getCountry()); 
            user.setPostalCode(userForm.getPostalCode());
            //set enable
            user.setPassword(userForm.getPassword());
            user.setConfirmPassword(userForm.getConfirmPassword());
            user.setAbout(userForm.getAbout());

            User savedUser=userService.saveUser(user);
            System.out.println(savedUser);
            
            Message message =  Message.builder().content("Resgistration Sucessful").type(MessageType.green).build();
            session.setAttribute("message",  message);
            return "redirect:/register";
        }
    }