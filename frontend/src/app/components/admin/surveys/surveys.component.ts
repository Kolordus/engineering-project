import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService, Survey} from '../../../services/http.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  surveys$: Observable<Array<Survey>>;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.surveys$ = this.http.getAllSurveys();
  }

}
