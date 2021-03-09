package com.kolak.engineeringproject.repositories;

import com.kolak.engineeringproject.model.User;
import com.kolak.engineeringproject.model.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserImageRepository extends JpaRepository<UserImage, Long> {

    Optional<UserImage> findByUser(User user);
}
