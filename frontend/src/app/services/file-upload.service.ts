import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from "./user-info.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  connectionUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private userInfo: UserInfoService) {
  }

  public uploadFile(formData): Observable<HttpEvent<FormData>> {
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.post<FormData>(this.connectionUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events',
      headers
    });
  }

  public downloadFile(){
    const headers = new HttpHeaders({Authorization: this.userInfo.getToken()});
    return this.http.get<Blob>(this.connectionUrl + '/profile-image', {
      responseType: 'blob' as 'json',
      headers
    });
  }


}
