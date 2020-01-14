import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  private uri = 'http://localhost:4000/home';

  // retourne les projets de l'utilisater courent
  getProjects() {
    return this.http.get(this.uri + '/')
    .pipe(catchError(this.errorHandler));
  }

  // retourne le nom et le prénom de l'utilisateur courent
  getUser() {
    return this.http.get(this.uri + '/user')
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  deleteProject(projectId) {
    return this.http.delete(this.uri + '/deleteProject/' + projectId)
    .pipe(catchError(this.errorHandler));
  }





}
