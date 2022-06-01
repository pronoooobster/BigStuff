import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { User } from '../User';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$?: Observable<User | null | undefined>;
  userLoggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afAuth.onAuthStateChanged((user) => {
      if(user) this.userLoggedIn = true;
      else this.userLoggedIn = false;
    });
  }

  signupUserEmail(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      let lowercaseEmail = user.email.toLowerCase();
      result.user?.sendEmailVerification();
      this.updateUserData({
        uid: result.user?.uid,
        email: result.user?.email,
        displayName: user.displayName
      });
      this.router.navigate(['/dashboard']);

    })
    .catch(error => {
      console.log('Auth service signup error', error);
      if(error.code) return { isValid: false, message: error.message };
      return null;
    })
  }

  loginUserEmail(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User logged in');
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      console.log('Login error, error code', error.code);
      if(error.code) return { isValid: false, message: error.message };
      return null;
    })
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider;
    const credential = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    return this.router.navigate(['/dashboard']);
  }

  async logOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/home']);
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    return userRef.set(data, { merge: true });
  }
}
