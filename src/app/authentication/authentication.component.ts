import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationResponseData, AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  template:
      `
    <div class="row justify-content-md-center mt-4">
      <div class="col-xs-12 col-md-6 col-md-offset-3">
        <div *ngIf="isLoading" style="text-align: center;">
          <app-loading-spinner></app-loading-spinner>
        </div>
        <form #authForm="ngForm" (ngSubmit)="onSubmit(authForm)" *ngIf="!isLoading">
          <div *ngIf="error" class="alert-danger">
            <h4>{{ error }}</h4>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name="email"
              required
              email
            />
          </div>
          <div class="form-group">
            <label for="password">Hasło</label>
            <input
              type="password"
              id="password"
              class="form-control"
              ngModel
              name="password"
              required
              minlength="6"
            />
          </div>
          <div>
            <button
              class="btn btn-primary"
              type="submit"
              [disabled]="!authForm.valid"
            >{{isLoginMode ? 'Zaloguj się' : 'Zarejestruj się'}}</button>
          </div>
          <div class="font-italic small" *ngIf="isLoginMode">
            Nie mam konta!&nbsp; <a (click)="switchMode()" class="font-weight-bold">Zarejestruj się!</a>
          </div>
          <div class="font-italic small" *ngIf="!isLoginMode">
            Mam konto!&nbsp; <a (click)="switchMode()" class="font-weight-bold">Zaloguj się!</a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AuthenticationComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthenticationResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }
    authObservable.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
}
