import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, IonContent, IonButton, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserRecover } from '../../../../interfaces/user';
import { NavController } from '@ionic/angular';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
  imports: [IonSpinner, IonInput, IonItem, IonButton, IonContent, CommonModule, ReactiveFormsModule, LogoComponent],
})
export class VerifyCodePage implements OnInit {
  recoverPasswordForm: FormGroup;
  loading = false;
  email: string = '';
  timer: number = 20;

  constructor(
    private _recoverPasswordService: RecoverPasswordService,
    private _toastService: ToastService,
    private _storageService: StorageService,
    private navCtrl: NavController,
    
    private fb: FormBuilder,
  ) {
    this.recoverPasswordForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });

  }

  async ngOnInit() {
    const recoverData = await this._storageService.getData<UserRecover>('recoverUser');
    this.email = recoverData?.email || '';
    this.startTimer();
  }

  get code() { return this.recoverPasswordForm.get('email'); }

  async verifyCode() {

    if (this.recoverPasswordForm.invalid) return;

    const userVerify: UserRecover = { ...this.recoverPasswordForm.value, email: this.email };
    this.loading = true;

    try {
      const response = await this._recoverPasswordService.verifyCode(userVerify);
      this.loading = false;

      if (response.status === 200) {
        this.navCtrl.navigateRoot(['/new-password']);
        this._toastService.toastGreen('Código verificado correctamente.');
        this._storageService.setData('recoverUser', userVerify);
      } else {
        this._toastService.toastYellow(response.data.message);
      }
    } catch (error) {
      this.loading = false;
      this._toastService.toastRed();
    }
  }

  requestNewCode() {
    const UserVerify: UserRecover = { email: this.email };
    this._recoverPasswordService.sendCode(UserVerify);
    this.timer = 20;
    this.startTimer();
  }

  startTimer() {
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

}
