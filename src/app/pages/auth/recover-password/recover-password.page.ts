import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonInput } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  standalone: true,
  imports: [IonButton, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonInput,  
    CommonModule, 
    FormsModule,
  ]
})
export class RecoverPasswordPage implements OnInit {
  email: string = '';

  constructor(
    private passwordService: RecoverPasswordService,
  ) { }

  ngOnInit() {}
  
  solicitarCodigo() {
    this.passwordService.sendResetCode(this.email);
  }

}
