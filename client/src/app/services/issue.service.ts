import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Issue } from '../models/issue';
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

   getIssue(projectId) {
    return this._http.get(this._uri + '/list/' + projectId)
    .pipe(catchError(this.errorHandler));
  }

   getSpecificIssue(id) {
    return this._http.get(this._uri + '/spec/' + id)
    .pipe(catchError(this.errorHandler));
  }

  updateIssue(issue: Issue) {
    return this._http.put<any>(this._uri + '/update', issue)
    .pipe(catchError(this.errorHandler));
  }

  getProjectUsers(projectId) {
    return this._http.get(this._uri + '/projectUsers/' + projectId)
    .pipe(catchError(this.errorHandler));
  }

  takeIssue(issueId) {
    return this._http.get(this._uri + '/takeIssue/' + issueId)
    .pipe(catchError(this.errorHandler));
  }

  isAdmin(projectId) {
    return this._http.get(this._uri + '/isAdmin/' + projectId)
    .pipe(catchError(this.errorHandler));
  }

  deleteIssue(id) {
    return this._http.delete(`${this._uri}/delete/${id}`);
  }


}
