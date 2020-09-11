import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';

export interface AuthenticationResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthenticationResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => this.saveInLocalStorage(responseData))
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(responseData => this.saveInLocalStorage(responseData))
    );
  }

  handleError(errorResponse: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unnkon Error Occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password.';
        break;
    }
    return throwError(errorMessage);
  }

  private saveInLocalStorage(responseData: any): void {
    const user = new User(responseData.email, responseData.localId, responseData.idToken);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
  }
}
