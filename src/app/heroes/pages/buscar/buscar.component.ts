import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;
  alinearDerecha: number = 0;
  cantidadHeroesMostrar: number = 6;
  objetosVisualizar: number = 3;
  heroeVacio: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
  }

  @ViewChild('miCaja', { static: false }) caja!: ElementRef<HTMLDivElement>;
  @ViewChild('inputBuscar', {static: true}) input!: ElementRef<HTMLInputElement>;

  constructor(private heroesService: HeroesService) {
  }

  ngOnInit(): void {
    if ( window.innerWidth <= 991 ) {
      this.objetosVisualizar = 1;
      this.todosLosHeroes();
    } else {
      this.objetosVisualizar = 3;
      this.todosLosHeroes();
    }
  }

  todosLosHeroes(){
    this.heroesService.getHeroes().subscribe( { next: (response) => {
      this.heroes = response.splice(0, 6);
    } } );
  }

  buscando() {
    if (this.termino.trim() != '') {
      this.heroesService.getSugerencias(this.termino.trim()).subscribe({
        next: (response) => {
          this.alinearDerecha = 0;
          this.heroes = [];
          this.heroes = response;
          this.cantidadHeroesMostrar = response.length;//Mandamos el total de heroes
          console.log('Resultados: ', response.length)
        }
      })
    } else {
      this.todosLosHeroes()
      //this.heroes = [];
    }

  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
        this.heroeSeleccionado = undefined!;
        return;
      }
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!)
        .subscribe({
          next: (response) => {
            this.heroeSeleccionado = response;
            this.heroes = [];
            this.heroes.push(response)
            this.cantidadHeroesMostrar = 1;
            console.log('OpcionSeleccionada: ', response)
          }
        })
  }

  moverIz(){
    if ( this.cantidadHeroesMostrar != 1 ) { 
      if ( this.heroes.length != ( (this.cantidadHeroesMostrar * 2) - this.objetosVisualizar ) ) { 
        this.alinearDerecha += (this.caja.nativeElement.offsetWidth * 1);
        this.heroes.push(this.heroeVacio)
      }
    }
  }

  moverDer(){
    if ( this.alinearDerecha != 0 ) {
      if ( this.heroes.length != this.cantidadHeroesMostrar ) { 
        this.alinearDerecha -= (this.caja.nativeElement.offsetWidth * 1);
        this.heroes.pop()
      }
    }
  }

  onResize( resized: any ){
    const width = resized.target.screen.width;
    if(width <= 991){
      this.alinearDerecha = 0;
      this.cantidadHeroesMostrar = 6;
      this.objetosVisualizar = 1;
      this.todosLosHeroes();
    } else {
      this.alinearDerecha = 0;
      this.cantidadHeroesMostrar = 6;
      this.objetosVisualizar = 3;
      this.todosLosHeroes();

    }

    
    //console.log(resized.target.screen)
  }


}
