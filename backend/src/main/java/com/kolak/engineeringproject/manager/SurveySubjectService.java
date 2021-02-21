package com.kolak.engineeringproject.manager;

import com.google.common.hash.Hashing;
import com.kolak.engineeringproject.model.Subject;
import com.kolak.engineeringproject.model.SubjectAverages;
import com.kolak.engineeringproject.model.Survey;
import com.kolak.engineeringproject.repositories.SubjectRepo;
import com.kolak.engineeringproject.repositories.SurveyRepo;
import com.kolak.engineeringproject.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SurveySubjectService {

    private final SubjectRepo subjectRepo;
    private final SurveyRepo surveyRepo;
    private final UserRepo userRepo;

    @Autowired
    public SurveySubjectService(SubjectRepo subjectRepo, SurveyRepo surveyRepo, UserRepo userRepo) {
        this.subjectRepo = subjectRepo;
        this.surveyRepo = surveyRepo;
        this.userRepo = userRepo;
    }

    public void saveSurvey(Survey newSurvey) {
        this.surveyRepo.save(new Survey(
                newSurvey.getSubject(),
                Hashing
                        .sha256()
                        .hashString(newSurvey.getUserId() + "user", StandardCharsets.UTF_8)
                        .toString(),

                newSurvey.getRate1(),
                newSurvey.getRate2(),
                newSurvey.getRate3(),
                newSurvey.getOpinion(),
                newSurvey.getToken()
        ));
    }

    public Map<String, Integer> getAmountOfUnfilledSurveysForEachUser() {
        Map<String, Integer> mapUsernameAndUnratedSurveys = new HashMap<>();

        this.userRepo.findAll()
                .stream()
                .filter(user -> !(user.getRole().equals("ROLE_ADMIN")))
                .forEach(user ->
                        mapUsernameAndUnratedSurveys.put(
                                user.getUsername(),
                                usersUnratedSurveys(user.getId()).size()));

        return mapUsernameAndUnratedSurveys;
    }

    public List<Subject> usersUnratedSurveys(Long userId) {
        List<Subject> allSubjects = subjectRepo.findAll();
        return usersUnratedSurveys(userId, allSubjects);
    }

    public List<Subject> usersUnratedSurveys(Long userId, List<Subject> allSubjects) {
        String encodedId = Hashing
                .sha256()
                .hashString(String.valueOf(userId) + "user", StandardCharsets.UTF_8)
                .toString();

        List<Subject> usersRatedSubjects = surveyRepo.findAll()
                .stream()
                .filter(survey -> survey.getUserId().equals(encodedId))
                .map(Survey::getSubject)
                .collect(Collectors.toList());

        allSubjects.removeAll(usersRatedSubjects);

        return allSubjects;
    }

    public List<Map<String, SubjectAverages>> getAllSubjectsWithAvgRatesAndPercentage() {

        return subjectRepo.findAll()
                .stream()
                .map(subject -> getSubjectsAvg(subject.getName()))
                .collect(Collectors.toList());
    }

    private Map<String, SubjectAverages> getSubjectsAvg(String subjectName) {
        List<Survey> subjectsSurveysList = surveyRepo.findAllBySubjectName(subjectName);
        SubjectAverages subjectAverages = new SubjectAverages();

        subjectAverages.setAveragesOfRate1(subjectsSurveysList
                .stream()
                .mapToDouble(Survey::getRate1)
                .average()
                .orElse(0.0));

        subjectAverages.setAveragesOfRate2(subjectsSurveysList
                .stream()
                .mapToDouble(Survey::getRate2)
                .average()
                .orElse(0.0));

        subjectAverages.setAveragesOfRate3(subjectsSurveysList
                .stream()
                .mapToDouble(Survey::getRate3)
                .average()
                .orElse(0.0));

        subjectAverages.setPercentageOfFilledSurveys(subjectsPercentageOfGivenSurveys(subjectName));

        Map<String, SubjectAverages> subjectsAverages = new HashMap<>();
        subjectsAverages.put(subjectName, subjectAverages);

        return subjectsAverages;
    }

    public double subjectsPercentageOfGivenSurveys(String subjectName) {
        double numberOfUsers = userRepo.findAll()
                .stream()
                .filter(user -> !user.getRole().equals("ROLE_ADMIN"))
                .count();
        double numberOfRates = surveyRepo.findAllBySubjectName(subjectName).size();

        if (numberOfRates == 0) {
            return 0.0f;
        }
        return numberOfRates / numberOfUsers * 100;
    }

    public List<Survey> getAllSurveys() {
        return surveyRepo.findAll();
    }

    public List<Survey> getUsersSurveys(String userId) {
        String encodedId = Hashing
                .sha256()
                .hashString(userId + "user", StandardCharsets.UTF_8)
                .toString();

        return this.surveyRepo.findAll()
                .stream()
                .filter(survey -> encodedId.equals(survey.getUserId()))
                .collect(Collectors.toList());
    }

    public Subject getSubjectByName(String subjectName) {
        return this.subjectRepo.findByName(subjectName);
    }

    public boolean checkIfSurveyChanged(String token) {
        if (surveyRepo.findByToken(token) != null)
            return true;
        return false;
    }
}


// trzeba zrobić przedmiot -> obiekt z danymi!