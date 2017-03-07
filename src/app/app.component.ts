import {Component, OnInit} from '@angular/core';

import {SurahsService} from "./services/surahs.service";
import {Surah} from "./model/surah";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AuthInfo} from "./model/AuthInfo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  authInfo:AuthInfo;

  constructor(private auth: AuthService , private router:Router){

  }

  ngOnInit(){
      this.auth.authInfo$.subscribe(info => this.authInfo = info);
  }

  isLoggedIn(){
    return this.auth.isAuthenticated();
  }

  logout(){
    this.auth.logout()
      .then(success => {
          this.router.navigate(['/login']);
      });
  }

}
