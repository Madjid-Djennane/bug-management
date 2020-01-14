import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  private uri = 'http://localhost:4000/profil';

  getUser() {
    return this.http.get(this.uri + '/')
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  updateUser(user) {
    return this.http.put<any>(this.uri + '/update', user)
    .pipe(catchError(this.errorHandler));
  }

  updatePassword(request) {
    return this.http.put<any>(this.uri + '/updatePassword', request)
    .pipe(catchError(this.errorHandler));
  }
}
