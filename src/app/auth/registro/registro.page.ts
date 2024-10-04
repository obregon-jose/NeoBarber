import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem]
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  numeroWhatsapp: string = '';
  password: string = '';
  confirmarPassword: string = '';
  emailValido: boolean = true;
  passwordValida: boolean = true;
  contrasenasCoinciden: boolean = true;

  constructor() { }

  ngOnInit() {}

  validarEmail() {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValido = patronEmail.test(this.email);
  }

  validarPassword() {
    this.passwordValida = this.password.length >= 8;
  }

  validarConfirmacionPassword() {
    this.contrasenasCoinciden = this.password === this.confirmarPassword;
  }

  formularioValido(): boolean {
    return (
      this.nombre !== '' &&
      this.apellido !== '' &&
      this.emailValido &&
      this.numeroWhatsapp !== '' &&
      this.passwordValida &&
      this.contrasenasCoinciden
    );
  }

  registrarUsuario() {
    if (this.formularioValido()) {
      console.log('Usuario registrado:', {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        numeroWhatsapp: this.numeroWhatsapp
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
