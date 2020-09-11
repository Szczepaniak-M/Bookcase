import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthenticationComponent} from './authentication/authentication.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
