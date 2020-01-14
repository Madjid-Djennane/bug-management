import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../services/profil.service';
import { User } from '../models/user';
import { Password } from '../models/password';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private profilService: ProfilService) { }

  user = new User('', '', '', '', '', '', '', '', [], []);
  password = new Password('', '', '');
  passwordConfirm = false;
  errorMsg = '';
  successMsg = '';

  ngOnInit() {
    this.profilService.getUser()
      .subscribe(
        (data: User) => {
          this.user = data;
        },
        err => {
          console.error(err);
        }
      );
  }

  onSubmit() {
    this.profilService.updateUser(this.user)
      .subscribe(
        data => {
          this.successMsg = 'User updated !';
          setTimeout(() => {
            this.successMsg = '';
          }, 2000);

        },
        err => {
          this.errorMsg = err.statusText;
        }
      );
  }

  onSubmitPwd() {
    this.profilService.updatePassword(this.password)
      .subscribe(
        data => {
          this.successMsg = 'Password updated !';
          setTimeout(() => {
            this.successMsg = '';
          }, 2000);
        },
        err => {
          this.errorMsg = err.statusText;
        }
      );
  }

  validatePassword(pwd, password) {
    if (pwd !== password) {
      this.passwordConfirm = false;
    } else {
      this.passwordConfirm = true;
    }
  }

}
