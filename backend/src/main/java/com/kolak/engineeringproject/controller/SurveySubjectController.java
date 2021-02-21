package com.kolak.engineeringproject.controller;

import com.kolak.engineeringproject.model.Subject;
import com.kolak.engineeringproject.model.SubjectAverages;
import com.kolak.engineeringproject.model.Survey;
import com.kolak.engineeringproject.manager.SurveySubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
//@CrossOrigin(origins = "https://engineering-project-frontend.herokuapp.com")
public class SurveySubjectController {

    private SurveySubjectService surveySubjectService;

    @Autowired
    public SurveySubjectController(SurveySubjectService surveySubjectService) {
        this.surveySubjectService = surveySubjectService;
    }

    @GetMapping("/subjects")
    public List<Map<String, SubjectAverages>> getAllSubjectsWithAvgRates() {
        return this.surveySubjectService.getAllSubjectsWithAvgRatesAndPercentage();
    }

    @GetMapping("/users")
    public Map<String, Integer> getAmountOfUnfilledSureysForEachUser() {
        return this.surveySubjectService.getAmountOfUnfilledSurveysForEachUser();
    }

    @GetMapping("/surveys")
    public List<Survey> getAllSurveys()
    {
        return this.surveySubjectService.getAllSurveys();
    }

    @GetMapping("/user-surveys/{userId}")
    public List<Survey> getUserSurveys(@PathVariable String userId) {
        return this.surveySubjectService.getUsersSurveys(userId);
    }

    @GetMapping("/user-surveys-unrated/{userId}")
    public List<Subject> getUnratedSubjects(@PathVariable Long userId) {
        return this.surveySubjectService.usersUnratedSurveys(userId);
    }

    @GetMapping("/checkSurvey/")
    public boolean checkIfSurveyChanged(@RequestParam String token) {
        return this.surveySubjectService.checkIfSurveyChanged(token);
    }

    @GetMapping("/subject/{subjectName}")
    public Subject getSubjectByName(@PathVariable String subjectName) {
        return this.surveySubjectService.getSubjectByName(subjectName);
    }


    @PostMapping("/save-survey")
    public ResponseEntity saveSurvey(@Validated @RequestBody Survey survey) {
        surveySubjectService.saveSurvey(survey);
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
