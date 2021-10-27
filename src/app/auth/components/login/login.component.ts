import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { LoginRequest } from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  pageLoading = false;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false, Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const formValue = this.loginForm.value;
      const loginRequest: LoginRequest = {
        username: formValue.username,
        password: formValue.password,
      };
      this.pageLoading = true;
      this.authService.login(loginRequest).subscribe({
        next: (data) => {
          console.log(data);
        },
        complete: () => {
          this.pageLoading = false;
          console.log('this.authService.login done!!!');
        },
      });
    }
  }

  loginWithNaver(): void {}

  loginWithKakaoTalk(): void {}
}
