import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-new',
  templateUrl: './password-new.page.html',
  styleUrls: ['./password-new.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PasswordNewPage implements OnInit {
  email: string = '';
  code: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private passwordService: RecoverPasswordService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.code = params['token'] || '';
    });
  }

  passwordNew() {
    this.passwordService.resetPassword(this.code, this.email, this.password);
  }

}
