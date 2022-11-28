import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
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

  @ViewChild('inputBuscar', {static: true}) input!: ElementRef<HTMLInputElement>;

  constructor(private heroesService: HeroesService) {
  }


  
  
  ngOnInit(): void {
    this.input.nativeElement.focus()
    this.todosLosHeroes();
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
          this.heroes = response;
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
    this.heroesService.getHeroePorId(heroe.id!).subscribe({
      next: (response) => {
        this.heroeSeleccionado = response;
        this.heroes = [];
        this.heroes.push(response)
        console.log('OpcionSeleccionada: ', response)
      }
    })
  }


}
