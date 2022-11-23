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
        path: 'listado', component: ListarComponent
      },
      {
        path: 'agregar', component: AgregarComponent
      },
      {
        path: 'editar/:id', component: AgregarComponent
      },
      {
        path: 'buscar', component: BuscarComponent
      },
      {
        path: ':id', component: HeroeComponent
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
