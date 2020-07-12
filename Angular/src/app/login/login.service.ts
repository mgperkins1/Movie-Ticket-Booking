import { User } from './../user';
import { RestService } from './../rest.service';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  private isLoggedIn = false;
  users: User[];

  constructor(private rest: RestService) { }

  getAllUsers(): Observable<User[]> {
    this.users = this.rest.getUsers();
    const userObservable = of(this.users);
    return userObservable;
  }

  isUserAuthenticated(username: string, password: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map(users => {
        const USER_DATA = users.find(user => (user.username === username) && (user.password === password));
        if (USER_DATA) {
          this.isLoggedIn = true;
        }
        return this.isLoggedIn;
      })
    );
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
