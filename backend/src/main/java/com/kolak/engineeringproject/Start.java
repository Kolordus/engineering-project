package com.kolak.engineeringproject;


import com.kolak.engineeringproject.manager.SurveySubjectService;
import com.kolak.engineeringproject.repositories.SubjectRepo;
import com.kolak.engineeringproject.repositories.SurveyRepo;
import com.kolak.engineeringproject.repositories.UserRepo;
import com.kolak.engineeringproject.controller.SurveySubjectController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class Start {

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserRepo userRepo;
    private SubjectRepo subjectRepo;
    private SurveyRepo surveyRepo;
    private SurveySubjectService surveySubjectService;

    private SurveySubjectController surveySubjectController;


    @Autowired
    public Start(SurveySubjectController surveySubjectController, SurveySubjectService surveySubjectService, UserRepo userRepo, SubjectRepo subjectRepo, SurveyRepo surveyRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepo = userRepo;
        this.subjectRepo = subjectRepo;
        this.surveyRepo = surveyRepo;
        this.surveySubjectController = surveySubjectController;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.surveySubjectService = surveySubjectService;
    }


    @EventListener(ApplicationReadyEvent.class)
    public void start() {


//        Subject przedmiot1 = new Subject("Projektowanie aplikacji internetowych");
//        Subject przedmiot2 = new Subject("Sztuczna inteligencja");
//        Subject przedmiot3 = new Subject("Podstawy programowania współbieżnego");
//        Subject przedmiot4 = new Subject("JAVA - programowanie sieciowe");
//        Subject przedmiot5 = new Subject("Wzorce projektowe");
//        Subject przedmiot6 = new Subject("Projekt inzynierski");
//        Subject przedmiot7 = new Subject("Testowanie oprogramowania");
//        Subject przedmiot8 = new Subject("Przyroda");
//        Subject przedmiot9 = new Subject("Systemy czasu rzeczywistego");
//        subjectRepo.save(przedmiot1);
//        subjectRepo.save(przedmiot2);
//        subjectRepo.save(przedmiot3);
//        subjectRepo.save(przedmiot4);
//        subjectRepo.save(przedmiot5);
//        subjectRepo.save(przedmiot6);
//        subjectRepo.save(przedmiot7);
//        subjectRepo.save(przedmiot8);
//        subjectRepo.save(przedmiot9);
//
//        User admin = new User("ROLE_ADMIN", "admin", bCryptPasswordEncoder.encode("admin123"), "email@email.email");
//        this.userRepo.save(admin);
//
//        Survey survey1 = new Survey(przedmiot1, admin.getId().toString(), 5, 5, 5, "super!");
//        Survey survey2 = new Survey(przedmiot2, admin.getId().toString(), 4, 5, 5, "fajowo!");
//        Survey survey3 = new Survey(przedmiot3, admin.getId().toString(), 3, 5, 5, "cool");
//        Survey survey4 = new Survey(przedmiot4, admin.getId().toString(), 2, 5, 5, "fantastich");
//        Survey survey5 = new Survey(przedmiot5, admin.getId().toString(), 5, 5, 5, "");
//        Survey survey6 = new Survey(przedmiot6, admin.getId().toString(), 4, 5, 5, "");
//        Survey survey7 = new Survey(przedmiot7, admin.getId().toString(), 1, 5, 5, "");
//        Survey survey8 = new Survey(przedmiot8, admin.getId().toString(), 4, 5, 5, "");
//        Survey survey9 = new Survey(przedmiot9, admin.getId().toString(), 5, 5, 5, "super!");
//
//        surveyRepo.save(survey1);
//        surveyRepo.save(survey2);
//        surveyRepo.save(survey3);
//        surveyRepo.save(survey4);
//        surveyRepo.save(survey5);
//        surveyRepo.save(survey6);
//        surveyRepo.save(survey7);
//        surveyRepo.save(survey8);
//        surveyRepo.save(survey9);




    }
}
