package com.kolak.engineeringproject.service;

import com.google.common.io.Files;
import com.kolak.engineeringproject.model.User;
import com.kolak.engineeringproject.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepo userRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepo = userRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void saveUser(User user) {
        this.userRepo.save(new User(user.getRole(),
                user.getUsername(),
                bCryptPasswordEncoder.encode(user.getPassword()),
                user.getEmail()));
    }

    public boolean isUserTaken(String username) {
        return this.userRepo.findByUsername(username).isPresent();
    }

    public User getUsersInfo(String username) {
        return userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Could't find such user!"));
    }

    public User getCurrentUser() {
        return userRepo.findByUsername(getCurrentUsername()).orElseThrow(() -> new UsernameNotFoundException("Could't find such user!"));
    }

    private String getCurrentUsername() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        UserDetails springSecurityUser;
        String userName = null;

        if (authentication != null) {
            if (authentication.getPrincipal() instanceof UserDetails) {
                springSecurityUser = (UserDetails) authentication.getPrincipal();
                userName = springSecurityUser.getUsername();
            } else if (authentication.getPrincipal() instanceof String) {
                userName = (String) authentication.getPrincipal();
            }
        }
        return userName;
    }


}
