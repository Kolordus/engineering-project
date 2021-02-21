import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// @ts-ignore
import { HttpService } from 'src/app/services/http.service';
// @ts-ignore
import { User } from 'src/app/User';
import { Router } from '@angular/router';
// @ts-ignore
import { PasswordValidator } from 'src/app/shared/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  usernameTaken: boolean;

  get userName() {
    return this.registerForm.get('userName');
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


  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, this.validateUsername()]],
      password: ['', [Validators.minLength(5), Validators.required]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }, { validator: PasswordValidator });


  }

  onSubmit() {
    const user: User = ({
      role: 'ROLE_USER',
      username: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email
    });

    this.http.registerUser(user).subscribe(u => {
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

          if(control.value === null) {
            this.usernameTaken = false;
          }
        }, (error => console.log('username available')));

      return { alreadyExist: false };
    };
  }
}


