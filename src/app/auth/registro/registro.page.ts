import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from '../services/registro/registro.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';


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
    private _registroService:RegistroService,
    private alertController:AlertController,
    private _router:Router,
  ) { }

  ngOnInit() {}

  showAlert(header: string, message: string){
    this.alertController.create({
      header:header, 
      message:message,
    buttons: ['OK']
  }).then(alert=>alert.present());
  }
  
  async registrarUsuario() {
    if (!this.email || !this.nombre || !this.password) {
      await this.showAlert('Error', 'debe llenar todos los campos');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      await this.showAlert('Error', 'Debes ingresar un Correo Electrónico válido');
      return;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(this.password)) {
      await this.showAlert('Error', 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');
      return;
    }
    
    
    let userData = {
      name: this.nombre,
      email: this.email,
      password: this.password
    }

    this._registroService.registroUser(userData).subscribe(
      async (response: any) => {
        if (!response.error) {
          // console.log(response);
          await this.showAlert('Notificación', response.message);
          this._router.navigate(['/login']);
          return;
        } else{
          // console.log(response);
        }

      },
      async (error: any) => {
        await this.showAlert('Error', error.error.message || 'Ocurrió un error inesperado');
      }
    );
  }
  
}