import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser() {
    throw new Error('Method not implemented.');
  }
  currentUser: any;
  constructor(
      private router: Router,
      private afAuth: AngularFireAuth
  ) {}

  logout() {
      this.afAuth.signOut().then(() =>{
        this.router.navigate([''])
        .catch((err)=> console.log(err))
      })
  }
}