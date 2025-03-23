import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
    selector: 'app-verify-code',
    templateUrl: './verify-code.page.html',
    styleUrls: ['./verify-code.page.scss'],
    imports: [IonInput, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VerifyCodePage implements OnInit {
  email: string = '';
  code: string = '';
  timer: number = 59;

  constructor(
    private passwordService: RecoverPasswordService,
    private route: ActivatedRoute,
    private _alertService: ToastService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
    this.startTimer();
  }
  isCodeValid(): boolean {
    return /^\d{6}$/.test(this.code);
  }

  verifyCode() {
    this.passwordService.verifyCode(this.code, this.email);
  }

  requestNewCode(){
    this.passwordService.sendResetCode(this.email);
    this.timer = 59;
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
