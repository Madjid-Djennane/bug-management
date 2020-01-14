import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _log: LoginService, private routerLink: Router) { }

  loginData = {uname:'', password:''};
  errorMsg= '';

  ngOnInit() {
  }

  onSubmit(){
    this._log.login(this.loginData)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          this.routerLink.navigate(['/template']);
        },
        error => {
          this.errorMsg = error.statusText;
        }
      );
  }

  login(){

  }

}
