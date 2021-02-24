import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {User} from './user.model';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{
  // Store an emit any changes to user
  user = new BehaviorSubject<User>(null);

  constructor (
    private http: HttpClient
  ) {};

  signUp(email: string, password: string) {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`
    return this.http.post<AuthResponseData>(
      endpoint,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resp => {
      this.handleAuth(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
    }))
  }

  signIn(email: string, password: string) {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`
    return this.http.post<AuthResponseData>(
      endpoint,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resp => {
      this.handleAuth(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
    }))
  }

  handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'An unkown error has occured';
    if (!errorResp.error || !errorResp.error.error) {
      // Handle unknown errors
      return throwError(errorMessage)
    }
    switch (errorResp.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
    }

    return throwError(errorMessage);
  }

  handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );

    const user = new User(
      email,
      userId,
      token,
      expDate
    );
    this.user.next(user);
    // Add auto logout call when implemented
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
