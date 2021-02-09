import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    public authService: AuthService) {}

  onSwitchMode(event) {
    event.preventDefault()
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

      const email = form.value.email;
      const password = form.value.password;

      if (this.isLoginMode) {
        this.authService.login(email, password);
      } else {
        // Register user and switch to login form
        this.authService.signup(email, password)
        .then(()=> console.log('login success'))
        .catch((error) => console.error(error))
      }



    }
  }
}
