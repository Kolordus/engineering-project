import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  unratedSubjectsNumber: number;
  showSpinner = true;

  constructor(private http: HttpService,
              private router: Router,
              public userInfo: UserInfoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.http.getUnratedSubjects().subscribe(value => {
      this.unratedSubjectsNumber = value.length;
      this.showSpinner = false;
    })
  }

  showRated() {
    this.router.navigate(['rated-subjects'], {relativeTo: this.activatedRoute});
  }

  showUnrated() {
    this.router.navigate(['unrated-subjects'], {relativeTo: this.activatedRoute});
  }




}
