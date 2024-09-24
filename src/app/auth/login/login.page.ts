import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonList,IonItem,IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList,IonItem,IonInput,IonButton,IonFooter,IonGrid,IonCol,IonRow,IonLabel,ReactiveFormsModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController) { }

  async iniciarSesion(event: Event, email: string | number | null | undefined, password: string | number | null | undefined) {
    event.preventDefault();// Prevenir la recarga de la página
  
    // Convertir a string si es un número
    const correo = String(email ?? '').trim();;
    const contrasena = String(password ?? '');

     // Expresión regular para correos electrónicos de Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  
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
      // Si el correo es válido y es de Gmail
  console.log('Correo:', correo, 'Contraseña:', contrasena);
  // Aquí puedes agregar la lógica para manejar el inicio de sesión

  }

  ngOnInit() {}
}
