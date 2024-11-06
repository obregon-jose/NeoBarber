import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VerifyCodePage implements OnInit {
  email: string = '';
  code: string = '';
  timer: number = 30;

  constructor(
    private passwordService: RecoverPasswordService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
    this.startTimer();
  }

  verifyCodigo() {
    this.passwordService.verifyCode(this.code, this.email);
  }

  requestNewCode(){
    this.passwordService.sendResetCode(this.email);
    this.timer = 30;
    this.startTimer();
  }
  startTimer() {
    const link = document.getElementById('requestNewCodeLink');
    if (link) {
      link.style.pointerEvents = 'none';
      link.style.color = 'gray'; // Opcional: Cambia el color para indicar que está deshabilitado
    }

    const interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(interval);
        if (link) {
          link.style.pointerEvents = 'auto';
          link.style.color = ''; // Restaurar el color original
        }
      }
    }, 1000); // 1000 milisegundos = 1 segundo
  }

}
