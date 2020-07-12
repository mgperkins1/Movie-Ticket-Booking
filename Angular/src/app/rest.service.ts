import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
// import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private users: User[];
  // private movies: Movie[];
  // private cities: City[];

  constructor(private http: HttpClient) {
    http.get<User[]>('http://localhost:3000/api/users').subscribe(
      (users) => this.users = users,
      catchError(this.handleError)
    );

    // http.get<City[]>('http://localhost:3000/api/cities').subscribe(
    //   (cities) => this.cities = cities,
    //   catchError(this.handleError)
    // );
  }

  // getCities(): City[] {
  //   return this.cities;
  // }

  getUsers(): User[] {
    return this.users;
  }

  getMovies(city: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`http://localhost:3000/api/movies/${city}`).pipe(
      catchError(this.handleError)
    );
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:3000/api/movies/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side error or network error occurred. Handle it accordingly
      console.log('An error occured: ', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unseccessful response code.
      // The response body may contain clues as to what went wrong
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.message;
    }
    return throwError(errMsg);
  }

}
