package com.kolak.engineeringproject.manager;

import com.kolak.engineeringproject.model.User;
import com.kolak.engineeringproject.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

}
