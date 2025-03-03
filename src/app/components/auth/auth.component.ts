import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(response => {
          localStorage.setItem('token', response['access_token']);
          this.router.navigate(['/dashboard']);
        }, error => {
          alert('Login failed: ' + error.message);
        });
    } else {
      this.authService.register(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password)
        .subscribe(response => {
          alert('Registration successful');
          this.onSwitchMode();
        }, error => {
          alert('Registration failed: ' + error.message);
        });
    }
  }
}
