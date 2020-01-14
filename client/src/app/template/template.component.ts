import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private routerLink: Router , private mainService: MainService, private loginService: LoginService) { }

  user: User;
  userName: string;

  ngOnInit() {

    this.mainService.getUser()
      .subscribe(
        (data: User) => {
          this.user = data;
          this.userName = this.user.lname + ' ' + this.user.name;
        },
        err => {
          console.log(err);
        }
      );

    this.routerLink.navigate(['template/home']);
  }

  logout() {
    this.loginService.logout();
  }
}
