import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public auth: AuthService) {
    auth.user$?.subscribe(user => console.log(user));
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logOut();
  }
}
