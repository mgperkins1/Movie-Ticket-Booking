import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { LoginGuardService } from './login/login-guard.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SortByPipe } from './movie-list/sort-by.pipe';
import { FilterByPipe } from './movie-list/filter-by.pipe';
import { MouseHoverDirective } from './mouse-hover.directive';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovieListComponent,
    NavbarComponent,
    SortByPipe,
    FilterByPipe,
    MouseHoverDirective,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbRatingModule
  ],
  providers: [
    LoginService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
