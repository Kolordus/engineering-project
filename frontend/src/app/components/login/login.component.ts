import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {HttpService} from 'src/app/services/http.service';
import {Router} from '@angular/router';
import {UserLog} from '../UserLog';
// @ts-ignore
import {UserInfoService} from 'src/app/services/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginData: UserLog;
  loginForm: FormGroup;
  wrongLogin = false;


  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder,
              private http: HttpService,
              private router: Router,
              private userInfo: UserInfoService) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.userInfo.getToken()) {



      if (this.userInfo.getUserRole() === 'ROLE_ADMIN') {
        this.router.navigate(['admin']);
      } else if (this.userInfo.getUserRole() === 'ROLE_USER') {
        this.router.navigate(['home']);
      }
    }
  }

  onSubmit() {
    this.userLoginData = this.loginForm.value;
    this.http.login(this.userLoginData).subscribe(data => {
      this.userInfo.setUserInfo(data[1], data[0], this.userLoginData.userName);

      if (sessionStorage.getItem('userRole') === 'ROLE_USER') {
        this.router.navigate(['home']);
      }

      if (sessionStorage.getItem('userRole') === 'ROLE_ADMIN') {
        this.router.navigate(['admin']);
      }

      this.wrongLogin = false;
    },
    err => {
      if (err) {
        this.wrongLogin = true;
        setTimeout(() => {
          this.wrongLogin = false;
        }, 4000);
      }
    });
  }

}
