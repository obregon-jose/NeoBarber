import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage implements OnInit {

  // Simulación de una base de datos de usuarios
  usuariosRegistrados: { [correo: string]: string } = {
    'usuario1@gmail.com': 'password123',
    'usuario2@gmail.com': 'mySecurePassword'
  };

  constructor(private alertController: AlertController, private router: Router) { }  // Añadir Router al constructor

  async iniciarSesion(event: Event, email: string | number | null | undefined, password: string | number | null | undefined) {
    event.preventDefault(); // Prevenir la recarga de la página

    // Convertir a string si es un número
    const correo = String(email ?? '').trim();
    const contrasena = String(password ?? '');

    // Expresión regular para correos electrónicos de Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Validar que el correo sea válido y tenga dominio @gmail.com
    if (!gmailRegex.test(correo)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El correo debe ser válido y tener el dominio @gmail.com',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar que los campos no estén vacíos
    if (!correo || !contrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Comprobar si el correo está registrado
    if (!this.usuariosRegistrados[correo]) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Cuenta no encontrada.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Comprobar si la contraseña es correcta
    if (this.usuariosRegistrados[correo] !== contrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Contraseña incorrecta.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Redirigir a la ruta "cliente" si el inicio de sesión es exitoso
    this.router.navigate(['/cliente']);
  }

  ngOnInit() { }
}

