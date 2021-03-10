import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfoService} from './user-info.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // connectionUrl = 'https://engineering-project-backend.herokuapp.com';
  connectionUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private userInfo: UserInfoService) {
  }


  getUserSurveys(): Observable<Array<Survey>> {
    return this.http.get<Array<Survey>>(this.connectionUrl + '/api/user-surveys/' + this.userInfo.getUserId());
  }

  getUnratedSubjects(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(this.connectionUrl + '/api/user-surveys-unrated/' + this.userInfo.getUserId());
  }

  getAllSubjects(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(this.connectionUrl + '/api/subjects');
  }

  getAllUsers(): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(this.connectionUrl + '/api/users');
  }

  getAllSurveys(): Observable<Array<Survey>> {
    return this.http.get<Array<Survey>>(this.connectionUrl + '/api/surveys');
  }

  saveSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.connectionUrl + '/api/save-survey', survey);
  }

  getSubjectByName(subjectName: string): Observable<Subject> {
    return this.http.get<Subject>(this.connectionUrl + '/api/subject/' + subjectName);
  }

  checkSurvey(token: string): Observable<any> {
    return this.http.get<Subject>(this.connectionUrl + '/api/checkSurvey/', {params: {
      token: token }});
  }

}

export interface Subject {
  id: number;
  name: string;
}

export interface Survey {
  id: number;
  subject: Subject;
  userId: string;
  rate1: number;
  rate2: number;
  rate3: number;
  opinion: string;
  token: string;
}



