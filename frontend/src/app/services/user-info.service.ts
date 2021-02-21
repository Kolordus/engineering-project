import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Survey, Subject} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userSurveys$: Observable<Array<Survey>>;
  unratedSubjects$: Observable<Array<Subject>>;

  constructor() {
  }

  setUserInfo(userId: string,
              userRole: string,
              username: string) {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userRole', userRole);
    sessionStorage.setItem('username', username);
  }

  getUserId(): number {
    return parseInt(sessionStorage.getItem('userId'));
  }

  getUserRole(): string {
    return sessionStorage.getItem('userRole');
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getUsername(): string {
    return sessionStorage.getItem('username');
  }

  deleteUserData() {
    sessionStorage.clear();
  }


}
