import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, take, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string,
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
  // Store an emit any changes to user
  user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;

  constructor (
    private http: HttpClient,
    private router: Router
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
    ).pipe(
      catchError(this.handleError),
      tap(resp => {
        this.handleAuth(resp.email, resp.localId, resp.idToken, +resp.expiresIn);
      })
    )
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
    ).pipe(
      catchError(this.handleError),
      tap(resp => {
        this.handleAuth(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
      })
    )
  }

  changePassword(newPassword:string) {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebase.apiKey}`
    let currentUser: User;
    this.user.pipe(
      take(1)
    ).subscribe(user => currentUser = user)

    return this.http.post<AuthResponseData>(
      endpoint,
      {
        idToken: currentUser.token,
        password: newPassword,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resp => {
      this.handleAuth(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
    }))
  }

  autoSignIn() {
    /**
     * Usage: Used to automatically log in user from app component when app first loads.
     */
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User (
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpDate)
    );

    // Check if the token has expired
    if (loadedUser.token) {
      // set the loaded users as the logged in user. The user token exp date will be validated in the autoSignOut method
      this.user.next(loadedUser)
      // The expDuration will be used to reset the timer in autoSignOut. If it's negative, the user will be immediately signed out
      const expDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime()
      this.autoSignOut(expDuration)
    }

    // If all is good, set app user to localstorage user
  };

  signOut() {
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoSignOut(expDuration) {
    this.tokenExpTimer = setTimeout(() => {
      this.signOut()
    }, expDuration)
  }

  handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'An unkown error has occured';
    if (!errorResp.error || !errorResp.error.error) {
      // Handle unknown errors
      return throwError(errorMessage)
    }
    switch (errorResp.error.error.message) {
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
