import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, IonButtons } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { LoginService } from '../services/login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { TokenService } from '../services/get-token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  providers: [
    LoginService,
    AlertToastService,
    TokenService, //
  ] 

})
export class LoginPage implements OnInit {
  email: any = null;
  password: any = null;
  loading: any;  // Variable para controlar el spinner

  constructor(
    private _alertService: AlertToastService,
    private _router: Router,
    private _loginService: LoginService,
    private _tokenService: TokenService, //
  ) { } 

  ngOnInit() { }

  async login() {
    
    if(!this.email || !this.password){
      this._alertService.alertToastYellow('Debe ingresar un correo electrónico y una contraseña', 'top');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this._alertService.alertToastYellow('Debes ingresar un Correo Electrónico válido', 'top');
      return;
    }

    let UserData = {
      email: this.email,
      password: this.password
    };

    const loading = await this._loading.presentLoading();

    this._loginService.login(UserData).subscribe((response: any) => {
      await loading.dismiss();
        if (!response.error) {

          if (response.role == 'cliente') {
            this._router.navigate(['/cliente']);
          } else if (response.role == 'peluquero') {
            this._router.navigate(['/peluquero']);
          } else if (response.role == 'administrador') {
            // Redirigir según sea necesario
          } else if (response.role == 'dueño') {
            // Redirigir según sea necesario
          } else if (response.role == 'root') {
            this._router.navigate(['/irregistro']);
          } else {
            this._alertService.alertToastRed('No se ha podido identificar el usuario', 'top');
          }
          this._tokenService.saveToken(response.token); // Guardar el token
        }
      },
      (error: any) => {
        await loading.dismiss();
        this._alertService.alertToastRed( error.error.message || 'Ocurrió un error inesperado', 'top');
      }
    )
    

  }

  // Método para cerrar sesión
  logout() {
    this._loginService.logout();
    this._alertService.alertToastGreen('Sesión cerrada', 'top');
  }
  // <ion-button (click)="logout()">Cerrar sesion</ion-button>
}
