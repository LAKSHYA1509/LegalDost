package com.LegalDost.config;

import java.util.Arrays;

import org.springframework.context.annotation.Configuration;

import com.LegalDost.services.UserDetailsService;

@Configuration
public class SecurityConfig {

    // login using java in memory service
    // @Bean
    // public UserDetailsService userDetailsService() {
    //     return new InMemoryUserDetailsManager(Arrays.asList(
    //         User.withDefaultPasswordEncoder()
    //         .username("user")
    //         .password("password")
    //         .roles("USER")
    //         .build()
    //         ));

}
