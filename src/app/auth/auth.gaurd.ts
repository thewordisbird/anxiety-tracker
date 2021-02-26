import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthRequired implements CanActivate {
  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      // Check to see if there is a user and that the user token is valid
      return this.authService.user.pipe(
        take(1),
        map(user => {
          if (!!user) {
            return true;
          } else {
            return this.router.createUrlTree(['/auth'])
          }
        })
      )
  }
}

@Injectable({ providedIn: 'root' })
export class NotAuthenticated implements CanActivate {
  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      // Check to see if there is a user and that the user token is valid
      return this.authService.user.pipe(
        take(1),
        map(user => {
          if (!!user) {
            return this.router.createUrlTree(['/add']);
          } else {
            return true;
          }
        })
      )
  }
}
