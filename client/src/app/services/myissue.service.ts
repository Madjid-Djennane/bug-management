import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyissueService {

  private uri = 'http://localhost:4000/issue';

  constructor(private http: HttpClient) { }

  getMyIssues() {
    return this.http.get(this.uri + '/getIssues')
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  nextStep(issueId) {
    return this.http.get(this.uri + '/next/' + issueId)
    .pipe(catchError(this.errorHandler));
  }


}
