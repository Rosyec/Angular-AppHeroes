import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  btnTexto: string = 'Guardar';
  publisher = [
    {
      id: Publisher.DCComics,
      desc: 'DC - Comics'
    },
    {
      id: Publisher.MarvelComics,
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
    img_url: ''
  };

  constructor(
    private heroesService: HeroesService,
    private activated: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.btnTexto = 'Editar';

    this.activated.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe({
        next: (response) => {
          this.heroe = response;
        }
      });
  }

  save() {
    if (this.heroe.superhero.trim().length == 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.updateHeroe(this.heroe).subscribe({
        next: (response) => {
          console.log('Heroe Actualizado: ', response);
          this.router.navigate(['/heroes/editar', this.heroe.id]);
          this.mostrarSnackber('Registro actualizado')
        }
      });
    } else {
      this.heroesService.saveHeroe(this.heroe).subscribe({
        next: (response) => {
          console.log('Heroe Guardado: ', response);
          this.router.navigate(['/heroes/listado']);
          this.mostrarSnackber('Registro guardado')
        }
      });
    }

  }

  delete() {

    const dialog = this.dialog.open(ConfirmComponent, { width: '250px', data: this.heroe });

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.heroesService.deleteHeroe(this.heroe).subscribe({
            next: (response) => {
              console.log('Heroe Eliminado: ', response);
              this.router.navigate(['/heroes/listado']);
            }
          });
        }
      }
    })


  }

  mostrarSnackber(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 2500 })
  }

}
