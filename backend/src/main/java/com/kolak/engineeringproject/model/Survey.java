package com.kolak.engineeringproject.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "surveys")
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Subject subject;

    private String userId;

    private int rate1;

    private int rate2;

    private int rate3;

    private String opinion;

    private String token;

    public Survey() {
    }

    public Survey(Subject subject, String userId, int rate1,
                  int rate2, int rate3, String opinion, String token){
        this.subject = subject;
        this.userId = userId;
        this.rate1 = rate1;
        this.rate2 = rate2;
        this.rate3 = rate3;
        this.opinion = opinion;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getRate1() {
        return rate1;
    }

    public void setRate1(int rate1) {
        this.rate1 = rate1;
    }

    public int getRate2() {
        return rate2;
    }

    public void setRate2(int rate2) {
        this.rate2 = rate2;
    }

    public int getRate3() {
        return rate3;
    }

    public void setRate3(int rate3) {
        this.rate3 = rate3;
    }

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "Survey{" +
                "id=" + id +
                ", subject=" + subject +
                ", userId='" + userId + '\'' +
                ", rate1=" + rate1 +
                ", rate2=" + rate2 +
                ", rate3=" + rate3 +
                ", opinion='" + opinion + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Survey survey = (Survey) o;
        return rate1 == survey.rate1 &&
                rate2 == survey.rate2 &&
                rate3 == survey.rate3 &&
                Objects.equals(id, survey.id) &&
                Objects.equals(subject, survey.subject) &&
                Objects.equals(userId, survey.userId) &&
                Objects.equals(opinion, survey.opinion) &&
                Objects.equals(token, survey.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, subject, userId, rate1, rate2, rate3, opinion, token);
    }
}
