import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/heroes/services/heroes.service';
import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  errorMsg: string = '';
  usuario: Auth = {
    usuario: '',
    email: ''
  };
  miFormulario: FormGroup = this.formBuilder.group(
    {
      usuario: ['User', [Validators.required]],
      email: ['user@example.com', [Validators.required, Validators.email]]
    }
  )

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  guardar(): void {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.invalid) {
      return;
    } else {
      this.error = false;
      this.register();
    }
  }

  register(): void {
    this.usuario.usuario = this.miFormulario.controls['usuario'].value;
    this.usuario.email = this.miFormulario.controls['email'].value;

    this.authService.login(this.usuario)
      .subscribe({
        next: (usuario) => {
          if (usuario.email === '') {
            this.error = false;
            this.authService.register(this.usuario)
              .subscribe({
                next: () => {
                  this.router.navigate(['./auth/login'])
                }
              });
          } else {
            this.errorMsg = 'Ya existe ese email';
            this.error = true;
          }
        }
      });
  }



  campoValido(campo: string, typeError: string): boolean {
    return this.miFormulario.controls[campo].getError(typeError) &&
      this.miFormulario.controls[campo].touched
  }


}




































// right: number = 0;
// left: number = 0;
// cajas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8']

// @ViewChild('miCaja', { static: false }) caja!: ElementRef<HTMLDivElement>;
// moverIz(){
//   if ( this.cajas.length != ( (8 * 2) - 3 ) ) { 
//     console.log('Tamaño: ', this.caja.nativeElement.offsetWidth)
//     this.right += (this.caja.nativeElement.offsetWidth * 1);
//     this.cajas.push(this.cajas.length.toString())//Agrega un elemento al final
//     console.log('Cajas: ',this.cajas.length)
//     console.log('Right: ',this.right)
//   }
// }

// moverDer(){
//   if ( this.cajas.length != 8 ) { 
//     this.right -= (this.caja.nativeElement.offsetWidth * 1);
//     this.cajas.pop()//Borra el ultimo elemento
//     console.log('Rigth: ',this.right)
//     console.log('Cajas: ',this.cajas.length)
//   }
// }