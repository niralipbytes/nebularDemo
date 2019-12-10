import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Define API
  apiURL = 'http://localhost:3000';

  // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch users list
  getUsers(): Observable<Users> {
    return this.http.get<Users>(this.apiURL + '/users')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API post() method => Create User
  createUser(user): Observable<Users> {
    console.log('user', user);
    return this.http.post<Users>(this.apiURL + '/users', user, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

   // HttpClient API delete() method => Delete User
   deleteUser(id) {
    return this.http.delete<Users>(this.apiURL + '/users/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API put() method => Update user
  updateUser(id, user): Observable<Users> {
    return this.http.put<Users>(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
