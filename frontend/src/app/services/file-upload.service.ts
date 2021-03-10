import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  connectionUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  public uploadFile(formData): Observable<HttpEvent<FormData>> {
    return this.http.post<FormData>(this.connectionUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public downloadFile(){
    return this.http.get<Blob>(this.connectionUrl + '/profile-image', {
      responseType: 'blob' as 'json'
    });
  }


}
