import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from '../services/registro/registro.service';
import {Router} from '@angular/router';
import { AlertToastService } from 'src/app/shared/alert-toast.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers:[
    RegistroService,
    AlertToastService,
  ]

})
export class RegistroPage implements OnInit {
  nombre: string = '';
  email: string = '';
  password: string = '';


  // apellido: string = '';
  // numeroWhatsapp: string = '';
  // confirmarPassword: string = '';
  // emailValido: boolean = true;
  // passwordValida: boolean = true;
  // contrasenasCoinciden: boolean = true;

  constructor(
    private _registroCliente:RegistroService,
    private _alertService: AlertToastService,
    private _router:Router,
  ) { }

  ngOnInit() {}
  
  async registrarUsuario() {
    if (!this.email || !this.nombre || !this.password) {
      this._alertService.alertToastYellow('Debe llenar todos los campos', 'top');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this._alertService.alertToastYellow('Debes ingresar un Correo Electrónico válido', 'top');
      return;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(this.password)) {
      this._alertService.alertToastYellow('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.', 'top');
      return;
    }
    
    
    let userData = {
      name: this.nombre,
      email: this.email,
      password: this.password
    }

    this._registroCliente.registroUser(userData).subscribe(
      (response: any) => {
        if (!response.error) {
          //this._router.navigate(['/login']);
          this._alertService.alertToastGreen(response.message || 'Registro exitoso', 'top');
        } else { //revisar no esta validando aqui
          this._alertService.alertToastRed(response.error.message || 'Ocurrió un error inesperado', 'top');
        }
      },
      (error: any) => {
        // Maneja errores en la petición HTTP
        this._alertService.alertToastYellow(error.error?.message || 'No pudimos registra su cuenta', 'top');
      }
    );
  }
  
}