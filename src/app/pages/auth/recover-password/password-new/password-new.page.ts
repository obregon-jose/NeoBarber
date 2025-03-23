import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonCheckbox, IonItem, IonLabel } from '@ionic/angular/standalone';
import { RecoverPasswordService } from 'src/app/services/auth/recover-password/recover-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-password-new',
    templateUrl: './password-new.page.html',
    styleUrls: ['./password-new.page.scss'],
    imports: [IonInput, IonButton, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
        IonCheckbox, IonItem, IonLabel,
    ]
})
export class PasswordNewPage implements OnInit {
  email: string = '';
  code: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;


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

  togglePasswordVisibility(event: any) {
    this.showPassword = event.detail.checked;
  }
  
  isPasswordValid(): boolean {
    return this.password === this.confirmPassword &&
           this.password.length >= 8 &&
          //  /[a-z]/.test(this.password) &&
          //  /[A-Z]/.test(this.password) &&
           /[0-9]/.test(this.password);
  }

  passwordNew() {
    this.passwordService.resetPassword(this.code, this.email, this.password);
  }

}
