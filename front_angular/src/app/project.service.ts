import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Project } from './project';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _uri = 'http://localhost:4000/project';

  constructor(private _http: HttpClient) { }

  addProjet() {
    return this._http.get(this._uri + '/addProject')
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  add(data) {
    return this._http.post(this._uri + '/add', data)
    .pipe(catchError(this.errorHandler));
  }
}
