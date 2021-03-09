package com.kolak.engineeringproject.service;

import com.google.common.io.Files;
import com.kolak.engineeringproject.model.User;
import com.kolak.engineeringproject.model.UserImage;
import com.kolak.engineeringproject.repositories.UserImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Service
public class FileService {

    private final UserImageRepository userImageRepository;
    private final UserService userService;


    public FileService(UserImageRepository userImageRepository, UserService userService) {
        this.userImageRepository = userImageRepository;
        this.userService = userService;
    }

    public void uploadFile(MultipartFile file) throws IOException {
        File saveDirectory = new File("/path/profile-images");
        if (!saveDirectory.exists()) {
            saveDirectory.mkdirs();
        }

        InputStream inputStream = file.getInputStream();
        String originalName = file.getOriginalFilename();
        String name = file.getName();
        System.out.println(file.getContentType());
        long size = file.getSize();
        File imagePath = new File(saveDirectory.getAbsolutePath() + File.separator + file.getOriginalFilename());
        Files.write(file.getBytes(), imagePath);

        UserImage userImage = new UserImage();
        userImage.setUser(userService.getCurrentUser());
        userImage.setPathToImage(imagePath.toString());
        saveImage(userImage);

    }

    private void saveImage(UserImage userImage) {
        if (userImageRepository.findByUser(userImage.getUser()).isPresent()) {
            System.out.println("jesli był plik to wypierdol stary i podmień");
            return;
        }

        userImageRepository.save(userImage);
    }

    public Optional<byte[]> getUserPicture() {
        return getFile(userService.getCurrentUser()).map(file -> {
            byte[] pictureBytes = null;
            try {
                pictureBytes = Files.toByteArray(file);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return pictureBytes;
        });
    }


    public Optional<File> getFile(User user) {
        Optional<UserImage> userImageOptional = userImageRepository.findByUser(user);
        return userImageOptional.map(userImage -> new File(userImage.getPathToImage()));

    }


}
