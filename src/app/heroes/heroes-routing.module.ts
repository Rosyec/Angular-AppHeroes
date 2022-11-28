import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ListarComponent } from './pages/listar/listar.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listado', component: ListarComponent, title: 'Listar'
      },
      {
        path: 'agregar', component: AgregarComponent, title: 'Agregar'
      },
      {
        path: 'editar/:id', component: AgregarComponent, title: 'Editar'
      },
      {
        path: 'buscar', component: BuscarComponent, title: 'Buscar'
      },
      {
        path: ':id', component: HeroeComponent, title: 'Ver'
      },
      {
        path: '**', redirectTo: 'listado'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
