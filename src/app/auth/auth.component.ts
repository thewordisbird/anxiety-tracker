import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSignInMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  onSwitchMode(event: Event) {
    event.preventDefault()
    this.isSignInMode = !this.isSignInMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>

      this.isLoading = true;
      if (this.isSignInMode) {
        authObs = this.authService.signIn(email, password);
      } else {
        authObs = this.authService.signUp(email, password);
      }

      authObs.subscribe(resp => {
        // Add user to firestore
        if (!this.isSignInMode){
          this.dataStorageService.addUser(resp.localId, resp.email)
        }
        this.isLoading = false;
        this.router.navigate(['/add'])
      },
      errorMessage => {
        this.error = errorMessage;
        // Show error alert
        this.isLoading = false;
      });
    }
  }
}
