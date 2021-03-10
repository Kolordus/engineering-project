import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserLog} from "../components/UserLog";
import {Observable} from "rxjs";
import {User} from "../User";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  connectionUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  login(user: UserLog){
    return this.http.post<JwtResponse>(this.connectionUrl + '/authenticate', user);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.connectionUrl + '/register', user);
  }

  isUserTaken(username: string): Observable<boolean> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa('admin' + ':' + 'admin123')});
    return this.http.get<boolean>(this.connectionUrl + '/is-user-taken/' + username, {headers});
  }


}



export interface JwtResponse {
  jwt: string;
}
