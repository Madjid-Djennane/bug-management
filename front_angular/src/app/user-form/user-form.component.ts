import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
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
          console.log(data.issue);
          this._router.navigate(['/login']);
        },
        error => this.errorMsg = error.statusText
      );


  }

  ngOnInit() {

  }

}
