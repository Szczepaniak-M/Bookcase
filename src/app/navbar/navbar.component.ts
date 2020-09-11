import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
