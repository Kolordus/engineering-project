import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService, Subject} from '../../../services/http.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.css']
})
export class SubjectsTableComponent implements OnInit {

  subjcets$: Observable<Array<Subject>>;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.subjcets$ = this.http.getAllSubjects();
  }

}
