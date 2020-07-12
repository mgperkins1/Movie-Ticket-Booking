import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from './../movie';
import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SharedService } from './../shared.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  header = 'In Theaters Now';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  errorMessage: string;
  defaultCity = 'miami lakes';
  sortByArg = '';
  filterByArg = '';
  _searchTerm: string;

  constructor(
    private sharedService: SharedService,
    private rest: RestService,
    private ratingConfig: NgbRatingConfig,
    private route: ActivatedRoute,
    private router: Router
  ) {
    ratingConfig.max = 5;
    ratingConfig.readonly = true;
    ratingConfig.resettable = false;
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(term: string) {
    this._searchTerm = term;
    this.filteredMovies = this.filterMovies(term);
  }

  filterMovies(term: string): Movie[] {
    return this.movies.filter(
      (movie) => movie.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
    );
  }

  onBookMovie(id: string) {
    this.router.navigate(['movie-details', id]);
  }

  // onBookMovie(movie: Movie) {
  //   this.sharedService.setData(movie);
  //   this.router.navigate(['movie-details']);
  // }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('city')) {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.rest.getMovies(params.get('city'))
          )
        )
        .subscribe(
          (response) => {
            this.movies = response;
            this.filteredMovies = this.movies;
          },
          (error) => (this.errorMessage = error as string)
        );
    } else {
      this.rest.getMovies(this.defaultCity).subscribe(
        (response) => {
          this.movies = response;
          this.filteredMovies = this.movies;
        },
        (error) => (this.errorMessage = error as string)
      );
    }
  }
}
