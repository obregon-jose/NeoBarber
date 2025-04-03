import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonItem, IonLabel, IonText, IonSpinner } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { RouterLink } from '@angular/router';
import { UserRecover } from 'src/app/interfaces/user';
import { NavController } from '@ionic/angular';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  imports: [IonItem, IonButton, IonContent, IonInput, IonSpinner,
    CommonModule,
    RouterLink,
    ReactiveFormsModule, LogoComponent]
})
export class RecoverPasswordPage {
  recoverPasswordForm: FormGroup;
  loading = false;

  constructor(
    private _recoverPasswordService: RecoverPasswordService,
    private _toastService: ToastService,
    private _storageService: StorageService,
    private navCtrl: NavController,
    private fb: FormBuilder,
  ) {
    this.recoverPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)]],
    });
  }

  get email() { return this.recoverPasswordForm.get('email'); }

  async requestCode() {
    if (this.recoverPasswordForm.invalid) return;

    const email: UserRecover = this.recoverPasswordForm.value;
    this.loading = true;

    try {
      const response = await this._recoverPasswordService.sendCode(email);
      this.loading = false;

      if (response.status === 200) {
        this.navCtrl.navigateRoot(['/verify-code']);
        this._toastService.toastGreen('Código enviado a tu correo electrónico.');
        this._storageService.setData('recoverUser', email);
        
      } else {
        this._toastService.toastYellow(response.data.message);
      }
    } catch (error) {
      this.loading = false;
      this._toastService.toastRed();
    }
  }

}
