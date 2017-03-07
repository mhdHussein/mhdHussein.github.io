import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFire, AngularFireAuth} from "angularfire2";
import Promise = firebase.Promise;
import {Observable, BehaviorSubject, Subject} from "rxjs";
import {AuthInfo} from "../model/AuthInfo";

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);
  authInfo$:BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private ngFire:AngularFire , private auth:AngularFireAuth) { }


  login(email:string , password:string){

    return this.fromFirebaseAuthPromise(this.auth.login({email : email , password : password}));

  }

  fromFirebaseAuthPromise(promise):Observable<any>{
    const subject = new Subject<any>();

    promise
      .then(res =>{
        const authInfo = new AuthInfo(firebase.auth().currentUser.uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      });

    return subject.asObservable();
  }

  logout(){

    return firebase.auth().signOut();

  }

  isAuthenticated(){
    const user = firebase.auth().currentUser;
    if(user)
      return true;

    return false;
  }

}
