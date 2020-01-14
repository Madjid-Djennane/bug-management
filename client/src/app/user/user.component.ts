import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];

  // tslint:disable-next-line: variable-name
  constructor(private _UserService: UserService, private _router: Router) { }

  ngOnInit() {
    this._UserService.getUser().
        subscribe(
          (data: User[]) => {
          this.users = data;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log(err);
              this._router.navigate(['/']);
            }
          }
        }
        );

  }


/*   onActive(value) {
    console.log(value);

    this._UserService.setActivation(value).
      subscribe(
        data => {
          console.log('success', data);
          // this._router.navigate(['/']);
        },
        error => console.error(error)
      );
  } */



}
