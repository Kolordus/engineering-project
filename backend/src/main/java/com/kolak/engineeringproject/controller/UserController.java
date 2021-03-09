package com.kolak.engineeringproject.controller;

import com.google.common.io.Files;
import com.kolak.engineeringproject.model.User;
import com.kolak.engineeringproject.service.FileService;
import com.kolak.engineeringproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.PermitAll;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")

public class UserController {

    private final UserService userService;
    private final FileService fileService;


    @Autowired
    public UserController(UserService userService, FileService fileService) {
        this.userService = userService;
        this.fileService = fileService;
    }

    @PostMapping("/register")
    @PermitAll()
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/is-user-taken/{username}")
    public boolean isUsernameTaken(@PathVariable String username) {
        return this.userService.isUserTaken(username);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<String>> getUsersInfo(@PathVariable String username) {
        List<String> userInfo = new ArrayList<>();
        userInfo.add(userService.getUsersInfo(username).getRole());
        userInfo.add(userService.getUsersInfo(username).getId().toString());

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file == null) {
            throw new RuntimeException("file is empty!");
        }

        fileService.uploadFile(file);

        return new ResponseEntity<>("dupsko", HttpStatus.OK);

    }

    @GetMapping("/profile-image")
    public ResponseEntity<byte[]> getImage() {
        if (fileService.getUserPicture().isPresent()) {
            return new ResponseEntity<>(fileService.getUserPicture().get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
