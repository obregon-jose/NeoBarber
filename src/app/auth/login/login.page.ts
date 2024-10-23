import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, IonButtons, IonIcon, IonTabButton } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  providers: [
    LoginService,
    AlertToastService,
  ] 

})
export class LoginPage implements OnInit {
  email: any = null;
  password: any = null;

  constructor(
    private _alertService: AlertToastService,
    private _authService: LoginService,
  ) {
    addIcons({
      'person': person,
    });
   } 

  ngOnInit() { }

  login() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this._alertService.alertToastYellow('Debes ingresar un Correo Electrónico válido', 'top');
      return;
    }

    if (this.email && this.password) {
      this._authService.login(this.email, this.password);
    } else {
      this._alertService.alertToastYellow('Debe ingresar un correo electrónico y una contraseña', 'top');
    }
  }

  // Método para cerrar sesión
  logout() {
    this._authService.logout();
  }
  // <ion-button (click)="logout()">Cerrar sesion</ion-button>
}
