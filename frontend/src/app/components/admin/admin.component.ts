import {Component, OnInit} from '@angular/core';
import {UserInfoService} from 'src/app/services/user-info.service';
import {ActivatedRoute, Router} from '@angular/router';

// ctrl n

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
    if (this.userInfo.getToken() === null || this.userInfo.getUserRole() !== 'ROLE_ADMIN') {
      this.router.navigate(['login']);
    }





  }

  showUsers() {
    this.router.navigate(['users'], {relativeTo: this.activatedRoute});
  }

  showSurveys() {
    this.router.navigate(['surveys'], {relativeTo: this.activatedRoute});
  }

  showSubjects() {
    this.router.navigate(['subjects'], {relativeTo: this.activatedRoute});
  }
}
