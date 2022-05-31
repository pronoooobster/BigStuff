import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  firebaseErrorMsg: string = '';

  constructor(public auth: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  loginEmail() {
    if(this.loginForm.invalid) return;

    this.auth.loginUserEmail(this.loginForm.value.email, this.loginForm.value.password)
    .then((result) => {
      if(result == null) {
        console.log('Logging in...');
        this.router.navigate(['/dashboard']);
      } else if(result.isValid == false) {
        console.log('Login error:', result);
        this.firebaseErrorMsg = result.message;
      }
    })
  }
}
