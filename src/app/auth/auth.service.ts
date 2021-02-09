import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {User} from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService{
  constructor (
    private auth: AngularFireAuth,
  ) {};

  public async signup(email: string, password: string) {
    console.log('in signup')
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => this.handleAuthentication(userCred))
      .catch(errorResp => this.handleError(errorResp))

  }

  public async login(email: string, password: string) {
    console.log("in login")
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(userCred => this.handleAuthentication(userCred))
      .catch(errorResp => this.handleError(errorResp))
  }

  private async handleAuthentication (userCred: firebase.auth.UserCredential) {
    const idToken = await userCred.user.getIdToken().then(idToken => {
      return idToken
    })
    const tokenExpTime = await userCred.user.getIdTokenResult().then(idTokenResult => {
      return idTokenResult.expirationTime
    })

    const user = new User(
      userCred.user.email,
      userCred.user.uid,
      idToken,
      new Date(tokenExpTime)
    )
    localStorage.setItem("userData", JSON.stringify(user))
  }

  private handleError (errorResp) {
    throw errorResp.message;


  }

}
