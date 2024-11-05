import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonIcon, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, 
    FormsModule,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

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
    //   this._alertService.toastYellow('Debes ingresar un Correo Electrónico válido');
    //   return;
    // }

    if (this.email && this.password) {
      this._authService.login(this.email, this.password);
    } else {
      this._alertService.toastYellow('Debe ingresar un correo electrónico y una contraseña');
    }
  }

}
