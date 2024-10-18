import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonInput, IonButton, IonItem, IonLabel, IonCheckbox, IonAccordionGroup, IonAccordion, IonRadioGroup, IonRadio, IonIcon, LoadingController } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from 'src/app/auth/services/registro/registro.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';


@Component({
  selector: 'app-registropeluquero',
  templateUrl: './registropeluquero.page.html',
  styleUrls: ['./registropeluquero.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCheckbox, IonLabel, IonItem, IonButton, IonInput, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonAccordionGroup, IonAccordion, IonRadioGroup, IonRadio, CommonModule, FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ], providers:[
    RegistroService,
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
    private _registroPeluquero: RegistroService,
    private _alertService: AlertToastService,
    private _loading: AlertToastService,
  ) { }

  ngOnInit() {
  }
  
  async registrarBarbero() {
    if (!this.email || !this.nombre) {
      return this._alertService.alertToastYellow('Debe llenar todos los campos');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      return this._alertService.alertToastYellow('Debes ingresar un Correo Electrónico válido');
    }

    let userData = {
      name: this.nombre,
      email: this.email,
      role_id: this.selectedRol,
    };
    const loading = await this._loading.presentLoading('Registrando...');
  
    this._registroPeluquero.crearUsuarioConRol(userData).subscribe(
      
      async (response: any) => {
        await loading.dismiss();
        if (!response.error) {
          // this.mostrarUsuarios(); // si es creado por un admin y tiene la lista de peluqueros abajo
          this._alertService.alertToastGreen('Usuario agregado exitosamente');
        } else {
          this._alertService.alertToastRed(response.error.message || 'Error al agregar el Usuario');
        }
      },
      async (error: any) => {
        await loading.dismiss();
        // Maneja errores en la petición HTTP
        this._alertService.alertToastRed(error.error?.message || 'Ocurrió un error inesperado');
      }
    );
  }

}
