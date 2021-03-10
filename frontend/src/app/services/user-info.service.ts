import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Survey} from './http.service';
import {SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userSurveys$: Observable<Array<Survey>>;
  image: Blob;
  imageURL: SafeUrl;

  constructor() {
  }

  setUserInfo(dataJwt: string){
    let parse = JSON.parse(atob(dataJwt.split('.')[1]));
    sessionStorage.setItem('jwtToken', dataJwt);
    sessionStorage.setItem('username', parse.sub)
    sessionStorage.setItem('userId', parse.userId)
    sessionStorage.setItem('userRole', parse.role[0].authority)
  }

  getjwtToken(): string {
    return sessionStorage.getItem('jwtToken');
  }

  getUserId(): number {
    return parseInt(sessionStorage.getItem('userId'));
  }

  getUserRole(): string {
    return sessionStorage.getItem('userRole');
  }

  getUsername(): string {
    return sessionStorage.getItem('username');
  }

  deleteUserData() {
    this.image = null;
    this.imageURL = null;
    sessionStorage.clear();
  }

}
