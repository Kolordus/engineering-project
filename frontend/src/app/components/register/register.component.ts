import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../User';
import {Router} from '@angular/router';
import {PasswordValidator} from '../../shared/password-validator';
import {LoginRegisterService} from "../../services/login-register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: LoginRegisterService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, this.validateUsername()]],
      password: ['', [Validators.minLength(5), Validators.required]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }, {validator: PasswordValidator});


  }

  registerForm: FormGroup;
  usernameTaken: boolean;

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }


  onSubmit() {
    const user: User = ({
      role: 'ROLE_USER',
      username: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email
    });

    this.http.registerUser(user).subscribe(_ => {
    });
    this.router.navigate(['login']);


    console.log(user);
  }


  private validateUsername(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      this.http.isUserTaken(control.value)
        .subscribe(
          (data) => {
            this.usernameTaken = data;

            if (control.value === null) {
              this.usernameTaken = false;
            }
          });

      return {alreadyExist: false};
    };
  }
}


