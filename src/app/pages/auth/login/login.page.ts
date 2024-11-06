import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, IonButtons, IonIcon, IonTabButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, 
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private _alertService: ToastService,
    private _authService: AuthService,
  ) {
    addIcons({
      person,
    });
   } 

  ngOnInit() { }

  login() {
    // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!emailPattern.test(this.email)) {
    //   this._alertService.toastYellow('Debes ingresar un Correo Electrónico válido', 'top');
    //   return;
    // }

    if (this.email && this.password) {
      this._authService.login(this.email, this.password);
    } else {
      this._alertService.toastYellow('Debe ingresar un correo electrónico y una contraseña');
    }
  }

}
