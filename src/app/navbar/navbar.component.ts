import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-header">
          <a routerLink="/" class="navbar-brand">Bookcase</a>
        </div>

        <div class="navbar">
          <ul class="nav">
            <li class="nav-item" >
              <a class="nav-link btn text-light" *ngIf="isAuthenticated" routerLink="/order-book">Order Book</a>
            </li>
            <li class="nav-item" *ngIf="!isAuthenticated">
              <a class="my-2 my-sm-0 mr-1 btn btn-outline-light" routerLink="/login">Login</a>
            </li>
            <li class="nav-item" *ngIf="isAuthenticated">
              <a class="my-2 my-sm-0 mr-1 btn btn-outline-light" (click)="onLogout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>
      this.isAuthenticated = !!localStorage.getItem('userData') || !!user
    );
  }

  onLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
