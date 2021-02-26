import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  isAuthenticated = false;
  private userSub: Subscription

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // subscribe to the user auth service observable.
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  handleSignOut() {
    this.authService.signOut()
  }
}
