import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = environment.URL_USUARIO;
  private auth: Auth | undefined;

  constructor( private http: HttpClient ) { }

  get getAuth(){
    return { ...this.auth };
  }

  login(){
    return this.http.get<Auth>(`${ this.url }/usuarios/104aax`)
    .pipe(tap( (response) => { this.auth = response } ),
          tap( (response) => { localStorage.setItem('token', response.id) } ));
  }

  verificarAuth():Observable<boolean>{
    if ( !localStorage.getItem('token') ) {
      return of(false)
    }

    return this.http.get<Auth>(`${ this.url }/usuarios/104aax`)
    .pipe( map( (auth) => {
      this.auth = auth;
      return true;
    } ) );
  }
}
