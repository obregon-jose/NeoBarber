import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonInput, IonButton, IonItem, IonLabel, IonCheckbox, IonAccordionGroup, IonAccordion, IonRadioGroup, IonRadio, IonIcon } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { RegistroPeluqueroService } from 'src/app/auth/services/registro-peluquero/registro-peluquero.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registropeluquero',
  templateUrl: './registropeluquero.page.html',
  styleUrls: ['./registropeluquero.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCheckbox, IonLabel, IonItem, IonButton, IonInput, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonAccordionGroup, IonAccordion, IonRadioGroup, IonRadio, CommonModule, FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ], providers:[
    RegistroPeluqueroService,
  ]
})
export class RegistropeluqueroPage implements OnInit {
  nombre: string = '';
  email: string = '';
  password: string = '';
  roles: { value: number }[] = [
    
    { value: 2 }
  ];
  selectedRol: number = 2; // Valor inicial por defecto



  constructor(
    private _registroPeluqueroService:RegistroPeluqueroService,
    private alertController:AlertController,
    private _router:Router,
  ) { }

  ngOnInit() {
  }

  showAlert(header: string, message: string){
    this.alertController.create({
      header:header, 
      message:message,
    buttons: ['OK']
  }).then(alert=>alert.present());
  }


  async registrarBarbero() {

    if (!this.email || !this.nombre) {
      await this.showAlert('Error', 'debe llenar todos los campos');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      await this.showAlert('Error', 'Debes ingresar un Correo Electrónico válido');
      return;
    }

    let userData = {
      name: this.nombre,
      email: this.email,
      role_id: this.selectedRol,
    };
  
    try {
      const response: any = await this._registroPeluqueroService.registerBarber(userData);
      
      if (response && !response.error) {
        await this.showAlert('Notificación', response.message || 'Registro exitoso');
      } else {
        await this.showAlert('Error', response.message || 'Ocurrió un error');
      }
    } catch (error: any) {
      // Manejar el error, asegurándote que tenga la estructura esperada
      await this.showAlert('Error', error.error?.message || 'Ocurrió un error inesperado');
    }
  }
  

}



