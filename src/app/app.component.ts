
import { isPlatformBrowser } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private authService: AuthService
  ) {};

  user$ = this.authService.user

  ngOnInit() {
    // If using server side rendering, need to check platform with isPlatformBrowser
    this.authService.autoSignIn()
  }
}
