import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:4000/login';
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    return this.http.post<any>(this.loginUrl, user)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getTokenSubject() {
    return this.helper.decodeToken(localStorage.getItem('token'));
  }


}
