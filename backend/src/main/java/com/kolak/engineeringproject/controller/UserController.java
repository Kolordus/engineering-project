package com.kolak.engineeringproject.controller;

import com.kolak.engineeringproject.manager.UserService;
import com.kolak.engineeringproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")

public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity saveUser(@Validated @RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/is-user-taken/{username}")
    public boolean isUsernameTaken(@PathVariable String username) {
        return this.userService.isUserTaken(username);
    }

    @GetMapping("/user/{username}")
    public List<String> getUsersInfo(@PathVariable String username) {
        List<String> userInfo = new ArrayList<>();
        userInfo.add(userService.getUsersInfo(username).getRole());
        userInfo.add(userService.getUsersInfo(username).getId().toString());

        return userInfo;
    }
}
