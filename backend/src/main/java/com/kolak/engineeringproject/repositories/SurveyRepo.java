package com.kolak.engineeringproject.repositories;


import com.kolak.engineeringproject.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SurveyRepo extends JpaRepository<Survey, Long> {

    List<Survey> findAllBySubjectName(String subjectsSurveys);

    Survey findByToken(String token);

}
