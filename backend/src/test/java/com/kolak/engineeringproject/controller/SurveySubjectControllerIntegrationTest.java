package com.kolak.engineeringproject.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kolak.engineeringproject.model.Subject;
import com.kolak.engineeringproject.model.Survey;
import com.kolak.engineeringproject.repositories.SubjectRepo;
import com.kolak.engineeringproject.repositories.SurveyRepo;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class SurveySubjectControllerIntegrationTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    SubjectRepo subjectRepo;

    @Autowired
    SurveyRepo surveyRepo;


    @Test
    public void saveSurvey() throws Exception {
        Survey survey = new Survey();
        survey.setOpinion("test opinion");
        survey.setRate1(5);
        survey.setRate2(3);
        survey.setRate3(4);
        survey.setSubject(subjectRepo.findAll().get(0));
        System.out.println(surveyRepo.findAll());


        mockMvc.perform(post("/api/save-survey")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(survey)))
                .andExpect(MockMvcResultMatchers.status().is(201))
                .andReturn();


        System.out.println(surveyRepo.findAll().size());
    }


}
