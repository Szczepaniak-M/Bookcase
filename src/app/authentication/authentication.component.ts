import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationResponseData, AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-authentication',
  template:
      `
    <div class="row justify-content-md-center">
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
            <label for="password">Password</label>
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
            >{{isLoginMode ? 'Login' : 'Sign Up'}}</button>
          </div>
          <div class="font-italic small" *ngIf="isLoginMode">
            I don't have an account! <a (click)="switchMode()" class="font-weight-bold">Sign Up!</a>
          </div>
          <div class="font-italic small" *ngIf="!isLoginMode">
            I have an account!<a (click)="switchMode()" class="font-weight-bold">Login!</a>
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

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
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
