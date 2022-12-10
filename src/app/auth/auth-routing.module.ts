import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppComponent } from '../app.component';

const routes : Route[] = [
  {
    path: '',// Se deja vacio para que la ruta sea: '/auth/login'. Si se pone un path, para acceder a sus rutas seria : 'auth/ejemplo/login'
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: '**', redirectTo: 'login'
      }
    ]
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes ),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
