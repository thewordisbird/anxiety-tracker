import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy{
  changePasswordForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  changePassword: boolean = false;
  message: string = null;
  error: boolean = false;
  currentUser: User;
  userSub: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validators: this.checkPasswords });

    this.userSub = authService.user.subscribe(user => this.currentUser = user)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onChangePassword() {
    this.changePassword = true
  }

  onCancel() {
    this.changePassword = false
  }

  onSubmit() {
    console.log('submitting')
    if (this.changePasswordForm.valid) {
      this.isLoading = true
      this.error = false
      const newPassword = this.changePasswordForm.controls.password.value;

      this.authService.changePassword(newPassword).subscribe(resp => {
        this.isLoading = false
        this.changePassword = false
        this.message = "Your password has been updated"
      },
      errorMessage => {
        this.error = true;
        this.message = errorMessage
        this.isLoading = false
      })
    }
  }

}
