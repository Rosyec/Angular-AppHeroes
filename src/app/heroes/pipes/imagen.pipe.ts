import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  pathImagen: string = '';

  transform( heroe: Heroe ): string {
    return this.pathImagen = 'assets/heroes/'.concat( heroe.id! ).concat('.jpg');
  }

}
