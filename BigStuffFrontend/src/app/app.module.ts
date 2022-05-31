import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './components/add-task/add-task.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';

const firebaseConfig = {
  apiKey: "AIzaSyCH32GVS_INoIGaAEjfcowYWVsF7vrE4jg",
  authDomain: "bigstuff-auth.firebaseapp.com",
  projectId: "bigstuff-auth",
  storageBucket: "bigstuff-auth.appspot.com",
  messagingSenderId: "874080827886",
  appId: "1:874080827886:web:ca5dde2deab51a89b1f6ff",
  measurementId: "G-PGZ7Q10Q9H"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TasksComponent,
    TaskItemComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    CoolSocialLoginButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
