import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(public userInfo: UserInfoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  showUsers() {
    this.router.navigate(['users'], {relativeTo: this.activatedRoute});
  }

  logout() {
    this.userInfo.deleteUserData();
    this.router.navigate(['login']);
  }

  showSurveys() {
    this.router.navigate(['surveys'], {relativeTo: this.activatedRoute});
  }

  showSubjects() {
    this.router.navigate(['subjects'], {relativeTo: this.activatedRoute});
  }
}
