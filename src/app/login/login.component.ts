import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { peliculaModel, PelisService } from '../pelis.service';

import { map } from 'rxjs/operators';
import { Form, FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  loading = false;
  action: 'login' | 'signup' = 'login';

  constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      public pelisService: PelisService

      
  ) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    private uid;

    
   
  async onSubmit(form: NgForm) {

      this.loading = true;
      this.error = null;
      const { firstName, lastName, email, password, phoneNumber } = form.value;
      let resp;

      try {

          if (this.isSignUp) {
              resp = await this.afAuth.createUserWithEmailAndPassword(email, password);

              await resp.user.updateProfile(
                  { displayName: `${firstName} ${lastName}` }
              );

              form.reset();
          } else {
              resp = await this.afAuth.signInWithEmailAndPassword(email, password);
          }
          
          this.uid = resp.user.uid;
          const uid = resp.user.uid;
          this.router.navigate([`/profile/${uid}`]);

      } catch (error) {
          console.log(error.message);
          this.error = error.message;
      }

      console.log(this.uid)
      this.loading = false;
  }

  get isLogin() {
      return this.action === 'login';
  }

  get isSignUp() {
      return this.action === 'signup';
  }

   
}
