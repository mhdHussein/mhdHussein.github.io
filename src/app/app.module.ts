import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {MaterialModule} from "@angular/material";
import {SurahsService} from "./services/surahs.service";
import 'hammerjs';
import { SurahListComponent } from './surah-list/surah-list.component';
import { AyahNumberPipe } from './pipes/ayah-number.pipe';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import { ContemplationListComponent } from './contemplation-list/contemplation-list.component';
import {ContemplationService} from "./services/contemplation.service";
import { LoginComponent } from './login/login.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";



const appConfig = {
  apiKey: "AIzaSyAQEjpg4sgiSQrXsEaytemflKieFkwUWJo",
  authDomain: "manager-3404b.firebaseapp.com",
  databaseURL: "https://manager-3404b.firebaseio.com",
  storageBucket: "manager-3404b.appspot.com",
  messagingSenderId: "248375988221"
};

const authConfig = {
  provider : AuthProviders.Password,
  method : AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    SurahListComponent,
    AyahNumberPipe,
    NumberToArrayPipe,
    ContemplationListComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(appConfig, authConfig),
    MaterialModule,
    RouterModule.forRoot(routerConfig)
  ],
  providers: [SurahsService , ContemplationService , AuthService , AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
