import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email:string = '';
  private password:string = '';

  actionButtonLabel: string = 'أعد المحاولة';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  addExtraClass: boolean = false;

  constructor(private auth:AuthService , private router:Router , public snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.email , this.password)
      .subscribe(val => {

        this.router.navigate(['/']);
      }, err =>{
        let config = new MdSnackBarConfig();
        config.duration = this.autoHide;
        config.extraClasses = ['snakBack'];
        this.snackBar.open("اسم المستخدم او كلمة المرور خاطئة",
                            this.action && this.actionButtonLabel,
                            config);

      });

  }

}
