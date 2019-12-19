import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _uri = 'http://localhost:4000/user';

  constructor(private _http: HttpClient) { }

  addUser(user: User) {
    return this._http.post<any>(this._uri + '/add', user)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  getUser() {
    return this._http.get(this._uri + '/');
  }

  setActivation(user: User) {
    return this._http.post<any>(this._uri + '/setActivation', user);
  }
}
