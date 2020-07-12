import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginGuardService } from './login/login-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'movie-list/:city', component: MovieListComponent, canActivate: [LoginGuardService] },
  { path: 'movie-list', component: MovieListComponent, canActivate: [LoginGuardService] },
  { path: 'movie-details/:id', component: MovieDetailsComponent, canActivate: [LoginGuardService] },
  { path: 'movie-details', component: MovieDetailsComponent, canActivate: [LoginGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
