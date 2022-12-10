import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.css']
})
export class ToolbarMenuComponent implements OnInit, AfterViewInit {
  title: string = 'App Héroes'
  mostrarBoton: boolean = false;
  rutas = {
    login: './auth/login',
    register: './auth/register'
  }


  constructor( private router: Router, private activated: ActivatedRoute ) { }

  ngAfterViewInit(): void {
  }


  ngOnInit(): void {
    this.activated.url.subscribe( { next: (response) => {
      console.log(response)
      if ( response.length === 0 ) {
          this.mostrarBoton = true;
      } else if ( response[0].path === 'login' ) {
        this.title = 'Iniciar Sesión'
      } else if ( response[0].path === 'register' ) {
        this.title = 'Registrarme'
      }
    } } )
    //const btn = document.getElementById('btnBack')
  }

  atras(){
    this.router.navigate(['./']);
  }

}
