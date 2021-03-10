import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserLog} from '../UserLog';
import {UserInfoService} from '../../services/user-info.service';
import {LoginRegisterService} from "../../services/login-register.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginData: UserLog;
  loginForm: FormGroup;
  wrongLogin = false;

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder,
              private http: LoginRegisterService,
              private router: Router,
              private userInfo: UserInfoService) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.userInfo.getjwtToken()) {

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

        this.userInfo.setUserInfo(data.jwt);

        if (sessionStorage.getItem('userRole') === 'ROLE_USER') {
          this.router.navigate(['home']);
        }

        if (sessionStorage.getItem('userRole') === 'ROLE_ADMIN') {
          this.router.navigate(['admin']);
        }
        window.location.reload();
        this.wrongLogin = false;
      },
      err => {
        console.log(err)
        if (err) {
          this.wrongLogin = true;
          setTimeout(() => {
            this.wrongLogin = false;
          }, 4000);
        }
      });
  }

}
