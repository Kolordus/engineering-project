import { Component } from '@angular/core';
import {UserInfoService} from './services/user-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public userInfo: UserInfoService,
              private router: Router) {
  }

  logout() {
      this.userInfo.deleteUserData();
      this.router.navigate(['login']);
  }

}
