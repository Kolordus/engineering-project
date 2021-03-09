package com.kolak.engineeringproject.service;

import com.kolak.engineeringproject.model.User;
import com.kolak.engineeringproject.repositories.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepo userRepo;

    @InjectMocks
    UserService userService;


    @Test
    void shouldReturnIfUserTaken() {
        // given
        when(userRepo.findByUsername("test"))
                .thenReturn(Optional.of(new User()));

        when(userRepo.findByUsername("empty"))
                .thenReturn(Optional.empty());


        //then
        Assertions.assertTrue(userService.isUserTaken("test"));
        Assertions.assertFalse(userService.isUserTaken("empty"));
    }

    @Test
    void shouldReturnUserInfo() {
        // given
        when(userRepo.findByUsername("test"))
                .thenReturn(Optional.of(new User("ROLE_USER", "test", "asd", "asd@ad.com")));

        when(userRepo.findByUsername("empty"))
                .thenReturn(Optional.empty());


        Assertions.assertEquals("test", userService.getUsersInfo("test").getUsername());
        Assertions.assertThrows(UsernameNotFoundException.class, () -> userService.getUsersInfo("empty"));
    }


}
