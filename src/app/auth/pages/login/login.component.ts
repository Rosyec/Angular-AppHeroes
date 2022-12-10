import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  usuario: Auth = {
    usuario: '',
    email: ''
  };
  miFormulario: FormGroup = this.formBuilder.group(
    {
      usuario: ['Rosyec Parrado', [Validators.required]],
      email: ['chechomens@gmail.com', [Validators.required, Validators.email]]
    }
  )

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  guardar(): void{
    this.miFormulario.markAllAsTouched();
    if ( this.miFormulario.invalid ) {
          return;
    } else {
      this.error = false;
      this.login();
    }
  }

  login(): void {
    this.usuario.usuario = this.miFormulario.controls['usuario'].value;
    this.usuario.email = this.miFormulario.controls['email'].value;
    this.authService.login( this.usuario )
      .subscribe({
        next: (response) => {
          if ( response.usuario === this.usuario.usuario && 
               response.email === this.usuario.email ) {
                this.router.navigate(['./heroes'])
          } else {
            console.log('Usuario no encontrado', response)
            this.error = true;
            return;
          }

          console.log(this.miFormulario.value)
          console.log('Response Backend; ',response)
        },
        error: (err) => {
          console.log('ERROR-LOGIN', err)
        }
      });
  }

  campoValido( campo: string, typeError: string ): boolean{
    return this.miFormulario.controls[ campo ].getError( typeError ) && 
           this.miFormulario.controls[ campo ].touched
  }

}
