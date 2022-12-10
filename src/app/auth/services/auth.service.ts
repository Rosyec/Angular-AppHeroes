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

  constructor(private http: HttpClient) { }

  get getAuth() {
    return { ...this.auth };
  }

  login( usuario: Auth ): Observable<Auth> {
    return this.http.get<Auth>(`${this.url}/usuarios/${ usuario.email }`)
      .pipe(tap((response) => { this.auth = response }),
        tap((response) => { localStorage.setItem('token', response.email) }));
  }

  register( usuario: Auth ): Observable<Auth>{
    return this.http.post<Auth>(`${this.url}/usuarios`, usuario);
  }

  verificarAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
        return of(false)
    } else {
        return this.http.get<Auth>(`${this.url}/usuarios/${ token }`)
          .pipe(map((auth) => {
            this.auth = auth;
            return true;
        }));
    }
  }




}