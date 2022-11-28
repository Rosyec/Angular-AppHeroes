import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url: string = environment.URL_BASE;

  constructor( private http: HttpClient ) { }

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(this.url.concat('/heroes'));
  }

  getHeroePorId( id:string ): Observable<Heroe>{
    return this.http.get<Heroe>(this.url.concat('/heroes/').concat( id ));
  }

  getSugerencias( termino: string ):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(this.url.concat('/heroes?q=').concat( termino ).concat('&_limit=6'));
  }

  saveHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.post<Heroe>(this.url.concat('/heroes'), heroe);
  }

  updateHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.put<Heroe>(this.url.concat('/heroes/').concat(heroe.id!), heroe);
  }

  deleteHeroe( heroe: Heroe ): Observable<any>{
    return this.http.delete<any>(this.url.concat('/heroes/').concat(heroe.id!));
  }
}
