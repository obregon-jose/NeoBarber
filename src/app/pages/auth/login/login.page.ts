import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent,IonInputPasswordToggle, IonItem, IonInput, IonButton, IonLabel, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { logoFacebook, logoGoogle, person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [IonButtons, IonIcon, IonInputPasswordToggle, IonContent, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonLabel,
        RouterLink]
})
export class LoginPage  {
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

  login() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email) && this.email !== '') {
      this._alertService.toastYellow('Debes ingresar un Correo Electrónico válido', 'top');
      return;
    }

    if (!this.email) {
      this._alertService.toastYellow('Debe ingresar un correo electrónico', 'top');
      return;
    }

    if (!this.password) {
      this._alertService.toastYellow('Debe ingresar una contraseña', 'top');
      return;
    }

    this._authService.login(this.email, this.password);
  }

}
