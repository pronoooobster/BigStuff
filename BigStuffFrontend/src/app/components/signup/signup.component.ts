import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  firebaseErrorMsg: string = '';

  constructor(public auth: AuthService, private router: Router, private afAuth: AngularFireAuth) 
  { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  signupEmail() {
    if(this.signupForm?.invalid) return;

    this.auth.signupUserEmail(this.signupForm?.value).then((result) => {
      if(result == null) this.router.navigate(['/dashboard']);
      else if (result.isValid == false) this.firebaseErrorMsg = result.message;
    }).catch(() => {

    });
  }

}
