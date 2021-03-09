package com.kolak.engineeringproject.model;

import javax.persistence.*;

@Entity
public class UserImage {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToOne
    private User user;

    private String pathToImage;

    private String downloadURL;


    public UserImage() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPathToImage() {
        return pathToImage;
    }

    public void setPathToImage(String pathToImage) {
        this.pathToImage = pathToImage;
    }

    public String getDownloadURL() {
        return downloadURL;
    }

    public void setDownloadURL(String downloadURL) {
        this.downloadURL = downloadURL;
    }

    @Override
    public String toString() {
        return "UserImage{" +
                "id=" + id +
                ", user=" + user +
                ", pathToImage='" + pathToImage + '\'' +
                ", downloadURL='" + downloadURL + '\'' +
                '}';
    }
}
