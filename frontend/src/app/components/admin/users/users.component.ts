import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<Map<string, string>>;


  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.users$ = this.http.getAllUsers();
  }


}
