import { SharedService } from './../shared.service';
import { switchMap } from 'rxjs/operators';
import { RestService } from './../rest.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  errorMessage = '';
  theaterSelected = false;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private rest: RestService
  ) { }

  ngOnInit() {
    // this.sharedService.currentData.subscribe((data: Movie) => {
    //   this.movie = data;
    //   console.log(this.movie);
    // });
    if (this.route.snapshot.paramMap.get('id')) {
      this.route.paramMap.pipe(switchMap((params: ParamMap) =>
        this.rest.getMovie(params.get('id')))).subscribe((response) => {
          this.movie = response;
          console.log(this.movie);
        },
          (error) => (this.errorMessage = error as string)
        );
    }
  }
}
