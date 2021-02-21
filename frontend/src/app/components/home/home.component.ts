import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {HttpService} from 'src/app/services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import {UserInfoService} from 'src/app/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService,
              private router: Router,
              public userInfo: UserInfoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.userInfo.getToken() === null || this.userInfo.getUserRole() !== 'ROLE_USER') {
      this.router.navigate(['login']);
    }
    /*
    Najlepiej jakby to było tutaj -> zastosowac INPUT
    tylko jak ogarnąć że się zmieniła wartość???
     */
    // this.userInfo.unratedSubjects$ = this.http.getUnratedSubjects();
  }

  showRated() {
    this.router.navigate(['rated-subjects'], {relativeTo: this.activatedRoute});
  }

  showUnrated() {
    this.router.navigate(['unrated-subjects'], {relativeTo: this.activatedRoute});
  }
}
