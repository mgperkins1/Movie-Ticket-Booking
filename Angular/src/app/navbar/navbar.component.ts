import { RestService } from './../rest.service';
import { LoginService } from './../login/login.service';
import { SharedService } from './../shared.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../city';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Movie Ticket Booking';
  username: string;
  welcomeUser = false;
  cities: City[] = [];

  constructor(
    private rest: RestService,
    private sharedService: SharedService,
    private loginService: LoginService,
    private router: Router
  ) { }

  onCitySelected(city: string) {
    this.router.navigate(['movie-list', city]);
  }

  logout() {
    this.welcomeUser = false;
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.sharedService.currentData.subscribe((data: string) => {
      this.username = data;
      this.welcomeUser = true;
    });

    // this.cities = this.rest.getCities();
  }

}
