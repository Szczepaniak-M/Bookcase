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
            <li class="btn" *ngIf="!isAuthenticated">
              <a routerLink="/login">Login</a>
            </li>
            <li class="btn" *ngIf="isAuthenticated">
              <a (click)="onLogout()">Logout</a>
            </li>
            <!--        <li class="btn">-->
            <!--          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor"-->
            <!--               xmlns="http://www.w3.org/2000/svg">-->
            <!--            <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>-->
            <!--          </svg>-->
            <!--        </li>-->
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
