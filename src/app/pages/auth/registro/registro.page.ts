import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { RegistroService } from 'src/app/services/auth/registro/registro.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButton, IonInput, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem,
  ],

})
export class RegistroPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';

  constructor(
    private _registroCliente: RegistroService,
    private _alertService: ToastService,
  ) { }

  ngOnInit() {}
  
  registrarUsuario() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    if (!emailPattern.test(this.email)) {
      this._alertService.toastYellow('Debes ingresar un Correo Electrónico válido');
      return;
    }

    const passwordPattern = /^(?=.*\d).{8,}$/;
    if (!passwordPattern.test(this.password)) {
      this._alertService.toastYellow('La contraseña debe tener al menos 8 caracteres y un número.');
      return;
    }

    if (this.email && this.name && this.password) {

      let userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone
      };
      this._registroCliente.RegistrarUsuario(userData);
    } else {
      this._alertService.toastYellow('Debe llenar todos los campos obligatorios');
    }
  }

}