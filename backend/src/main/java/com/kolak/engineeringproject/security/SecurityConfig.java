package com.kolak.engineeringproject.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    private UserDetailedServiceImpl userDetailedService;

    @Autowired
    public SecurityConfig(UserDetailedServiceImpl userDetailedService) {
        this.userDetailedService = userDetailedService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailedService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()

                .antMatchers("/h2").hasRole("ADMIN")
                .antMatchers( "/user").hasAnyRole("ADMIN", "USER")
                .antMatchers("/api/**").hasAnyRole("ADMIN", "USER")
                .and()

                .formLogin().permitAll()
                .and()

                .httpBasic()
                .and()

                .csrf().disable()
                .logout().permitAll()
                .and()
                .headers().frameOptions().disable()
                .and()
                .cors().disable();
    }
}
