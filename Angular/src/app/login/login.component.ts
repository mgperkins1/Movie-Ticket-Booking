import { SharedService } from './../shared.service';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isAuthenticated: boolean;
  submitted = false;
  errorMessage: string;

  title = 'Login';
  bodyText = `Movie Ticket Booking is an online application where you can book
  tickets for your favorite movie. Please login to the application to
  grab your movie tickets!`;


  constructor(
    private sharedService: SharedService,
    private loginService: LoginService,
    private router: Router) { }

  onSubmit(login) {
    this.submitted = true;
    const USERNAME = login.username;
    const PASSWORD = login.password;
    this.loginService.isUserAuthenticated(USERNAME, PASSWORD).subscribe(
      result => {
        if (result) {
          this.sharedService.setData(USERNAME);
          this.router.navigate(['movie-list']);
        } else {
          this.isAuthenticated = false;
        }
      }
    );
  }
}
