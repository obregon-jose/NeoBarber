import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonInput, IonButton, IonItem, IonLabel, IonCheckbox, IonAccordionGroup, IonAccordion, IonRadioGroup, IonRadio, IonIcon, LoadingController } from '@ionic/angular/standalone';
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
  ], providers: [
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
    private _registroPeluqueroService: RegistroPeluqueroService,
    private alertController: AlertController,
    private _router: Router,
    private loadingController: LoadingController // Importar el controlador de carga
  ) { }

  ngOnInit() {
  }

  showAlert(header: string, message: string) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      spinner: 'crescent',
    });
    await loading.present();
    return loading;
  }

  async registrarBarbero() {
    if (!this.email || !this.nombre) {
      await this.showAlert('Error', 'Debe llenar todos los campos');
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

    const loading = await this.presentLoading(); // Mostrar spinner de carga

    try {
      const response: any = await this._registroPeluqueroService.registerBarber(userData);

      await loading.dismiss(); // Ocultar el spinner al finalizar

      if (response && !response.error) {
        await this.showAlert('Notificación', response.message || 'Registro exitoso');
        this._router.navigate(['/login']); // Redireccionar después del registro exitoso
      } else {
        await this.showAlert('Error', response.message || 'Ocurrió un error');
      }
    } catch (error: any) {
      await loading.dismiss(); // Ocultar el spinner en caso de error
      await this.showAlert('Error', error.error?.message || 'Ocurrió un error inesperado');
    }
  }
}
