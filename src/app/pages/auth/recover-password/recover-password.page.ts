import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.page.html',
    styleUrls: ['./recover-password.page.scss'],
    imports: [IonLabel, IonText, IonItem, IonButton, IonContent, IonInput,
        CommonModule,
        FormsModule, RouterLink]
})
export class RecoverPasswordPage  {
  email: string = '';

  constructor(
    private passwordService: RecoverPasswordService,
    private _alertService: ToastService,
  ) { }

  
  
  requestCode() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email) && this.email !== '') {
      this._alertService.toastYellow('Debes ingresar un Correo Electrónico válido', 'top');
      return;
    }

    this.passwordService.sendResetCode(this.email);
  }

}
