import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if(user) {
          // if(!user.emailVerified) this.router.navigate(['/verify-email'])
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/home']);
          resolve(false);
        }
      })
    });
  }
  
}
