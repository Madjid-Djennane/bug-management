import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Issue } from './issue';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private _uri = 'http://localhost:4000/issue';


  constructor(private _http: HttpClient) { }

  addIssue(issue: Issue) {
    return this._http.post<any>(this._uri + '/add', issue)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

   getIssue() {
    return this._http.get(this._uri + '/');
  }

  getSpecificIssue(id) {
    return this._http.get(this._uri + '/' + id);
  }

  updateIssue(issue: Issue) {
    return this._http.put<any>(this._uri + '/update', issue)
    .pipe(catchError(this.errorHandler));
  }

}
