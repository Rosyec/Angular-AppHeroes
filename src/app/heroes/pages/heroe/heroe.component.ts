import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  id: string = '';

  constructor( private activatedRouter: ActivatedRoute, private heroesService: HeroesService, private router: Router ) {
   }

  ngOnInit(): void {
    this.activatedRouter.params
    .pipe( switchMap( ({ id }) => this.heroesService.getHeroePorId( id ) ) )
    .subscribe( { next: (response) => { this.heroe = response } } )
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }


}
