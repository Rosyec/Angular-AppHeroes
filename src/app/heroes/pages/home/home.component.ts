import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivationStart } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'Lista de Héroes';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe( (event) => {
      if ( event instanceof ActivationStart ) {
        this.setTitleToolbar( event.snapshot.routeConfig?.path || '' );
      }
    } )
  }

  funcionesNav(title: string) {
    this.sidenav.toggle();
    this.setTitleToolbar(title)
  }

  setTitleToolbar(title: string) {
    switch (title) {
      case 'listado':
        this.title = 'Lista de Héroes'
        break;

      case 'agregar':
        this.title = 'Agregar Héroe'
        break;

      case 'buscar':
        this.title = 'Buscar Héroe'
        break;

      case 'editar/:id':
        this.title = 'Editar Héroe'
        break;

      case ':id':
        this.title = 'Ver Héroe'
        break;

      default:
        this.title = 'Lista de Héroes'
        break;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['./auth'])
  }

  get auth(){
    return this.authService.getAuth;
  }

}