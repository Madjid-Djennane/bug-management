import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService, private _router: Router) { }

  roles = ['developer', 'architect', 'analyste', 'programmer'];

  userModel = new User('', '', '', '', '', '', '', 'default', [], []);

  passwordConfirm = true;
  submitted = false;

  roleHasError = true;
  successMsg = '';

  // tslint:disable-next-line: member-ordering
  errorMsg = '';

  validatePassword(pwd, password) {
    if (pwd !== password) {
      this.passwordConfirm = false;
    } else {
      this.passwordConfirm = true;
    }
  }

  validateRole(value) {
    if (value === 'default') {
      this.roleHasError = true;
    } else {
      this.roleHasError = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    delete this.userModel._id;
    this._userService.addUser(this.userModel)
      .subscribe(
        data => {
          this.successMsg = 'utilisateur créé !';
          setTimeout(() => {
            this.successMsg = '';
          }, 2000);

          this._router.navigate(['/login']);
        },
        error => this.errorMsg = error.statusText
      );


  }

  ngOnInit() {

  }

}
