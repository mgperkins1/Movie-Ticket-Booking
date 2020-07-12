import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    // console.log(this.loginService.isUserLoggedIn());
    if (this.loginService.isUserLoggedIn() === true) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
