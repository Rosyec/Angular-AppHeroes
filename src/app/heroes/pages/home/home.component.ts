import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'App Héroes';
  ruta: string = this.route.url;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private route: Router) { }

  ngOnInit(): void {

    switch ( this.ruta ) {
      case '/heroes/listado':
        this.title = 'Lista de Héroes'
        break;

      case '/heroes/agregar':
        this.title = 'Agregar Héroe'
        break;

      case '/heroes/editar':
        this.title = 'Editar Héroe'
        break;

      case '/heroes/buscar':
        this.title = 'Buscar Héroe'
        break;

      default:
        this.title = 'Lista de Héroes'
        break;
    }
  }

  funcionesNav(title: string) {
    this.title = title;
    this.toggle();
  }

  toggle() {
    this.sidenav.toggle();
  }

}
