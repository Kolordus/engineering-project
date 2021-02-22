import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../User';
import {UserLog} from '../components/UserLog';
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

  login(user: UserLog): Observable<any> {
    sessionStorage.setItem('token', 'Basic ' + btoa(user.userName + ':' + user.password));
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('token')});
    return this.http.get(this.connectionUrl + '/api/user/' + user.userName, {headers});
  }

  getUserSurveys(): Observable<Array<Survey>> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.get<Array<Survey>>(this.connectionUrl + '/api/user-surveys/' + this.userInfo.getUserId(), {headers});
  }

  getUnratedSubjects(): Observable<Array<Subject>> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.get<Array<Subject>>(this.connectionUrl + '/api/user-surveys-unrated/' + this.userInfo.getUserId(), {headers});
  }

  getAllSubjects(): Observable<Array<Subject>> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.get<Array<Subject>>(this.connectionUrl + '/api/subjects', {headers});
  }

  getAllUsers(): Observable<Map<string, string>> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.get<Map<string, string>>(this.connectionUrl + '/api/users', {headers});
  }

  getAllSurveys(): Observable<Array<Survey>> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.get<Array<Survey>>(this.connectionUrl + '/api/surveys', {headers});
  }

  isUserTaken(username: string): Observable<boolean> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa('admin' + ':' + 'admin123')});
    return this.http.get<boolean>(this.connectionUrl + '/api/is-user-taken/' + username, {headers});
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.connectionUrl + '/api/register', user);
  }

  saveSurvey(survey: Survey): Observable<Survey> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.post<Survey>(this.connectionUrl + '/api/save-survey', survey, {headers});
  }

  getSubjectByName(subjectName: string): Observable<Subject> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.get<Subject>(this.connectionUrl + '/api/subject/' + subjectName, {headers});
  }

  checkSurvey(token: string): Observable<any> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    const params = new HttpParams().set('token', token);
    return this.http.get<Subject>(this.connectionUrl + '/api/checkSurvey/', {params: {
      token: token,
      },
    headers: headers});
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



