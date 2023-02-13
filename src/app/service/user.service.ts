import { Injectable, NgZone } from '@angular/core';
import { User } from '../model/User';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NgxCaptchaModule } from 'ngx-captcha/lib';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: any;
  loginAttempts: number = 0;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFirestore
  ) {}

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userData: User = {
            uid: user.uid,
            email: user.email,
            loginDate: new Date(),
          };

          localStorage.setItem('currentUser', JSON.stringify(userData));
        }

        this.afAuth.authState.subscribe(async (user) => {
          if (user) {
            this.userData = (await this.getUserData(user.uid))[0];
          } else {
            localStorage.setItem('user', 'null');
            JSON.parse(localStorage.getItem('user')!);
          }
        });
      })
      .catch((error) => {
        this.loginAttempts++;
        let errorCode = error.code;
        let errorMessage = error.message;
        window.alert('Wrong email or password');
        console.log(errorCode);
        console.log(errorMessage);
        throw errorCode;
      });
  }

  getUserData(uid: string) {
    return new Promise<any>((resolve) => {
      this.db
        .collection('users', (ref) => ref.where('uid', '==', uid))
        .valueChanges()
        .subscribe((data) => resolve(data));
    });
  }

  SignUp(email: string, password: string, name: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData({
          uid: result.user?.uid,
          email: result.user?.email,
          name: name,
          password: password,
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      password: user.password,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    });
  }
}
