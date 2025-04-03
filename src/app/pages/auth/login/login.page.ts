import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent,IonInputPasswordToggle, IonItem, IonInput, IonButton, IonLabel, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoFacebook, logoGoogle, person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ReactiveFormsModule , FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/interfaces/user';
import { NavController } from '@ionic/angular';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [IonSpinner, 
      IonIcon, 
      IonInputPasswordToggle, 
      IonContent,  
      IonItem, 
      IonInput, 
      IonButton, 
      IonLabel,
      LogoComponent, 
      CommonModule, 
      RouterLink,
      ReactiveFormsModule,
    ],
})
export class LoginPage  {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private _toastService: ToastService,
    private _authService: AuthService,
    private navCtrl: NavController,
    private fb: FormBuilder,
  ) {
    addIcons({
      person, 
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)]],
      password: ['', [ Validators.required, Validators.minLength(8)]],
    });

   }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async login() {
    if (this.loginForm.invalid) return;

    const user: UserLogin = this.loginForm.value;
    this.loading = true;
    
    try {
      const response = await this._authService.login(user);
      this.loading = false;

      if (response.status === 200) {
        this._toastService.toastGreen('Bienvenido de nuevo!');
      } else {
        this._toastService.toastYellow(response.data.message);
      }
    } catch (error) {
      this.loading = false;
      this._toastService.toastRed();
    }

  }

}
