import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen',
  // pure: false//Se dispara cada cambio (Necesario para que tome la imagen al guardarse)
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {


    if (!heroe.id && !heroe.img_url) {
      return 'assets/noimage.png';
    } else if (heroe.img_url) {
      return heroe.img_url!;
    } else {
      return 'assets/heroes/'.concat(heroe.id!).concat('.jpg');
    }



  }

}
