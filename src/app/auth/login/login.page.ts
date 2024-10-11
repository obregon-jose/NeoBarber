import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, LoadingController, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { LoginService } from '../services/login/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, 
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    LoginService,
  ] 

})
export class LoginPage implements OnInit {
  email: any = null;
  password: any = null;
  loading: any;  // Variable para controlar el spinner

  constructor(
    private alertController: AlertController, 
    private _router: Router,
    private _loginService: LoginService,
    private loadingController: LoadingController  // Inyectar LoadingController
  ) { }

  ngOnInit() { }

  // Método para mostrar el spinner
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent'  // Tipo de spinner
    });
    await this.loading.present();
  }

  // Método para ocultar el spinner
  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  // Método para mostrar alertas
  showAlert(header: string, message: string) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  async login() {
    if (!this.email || !this.password) {
      await this.showAlert('Error', 'Debe ingresar un correo electrónico y una contraseña');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      await this.showAlert('Error', 'Debes ingresar un Correo Electrónico válido');
      return;
    }

    let UserData = {
      email: this.email,
      password: this.password
    };

    // Mostrar el spinner antes de la llamada a la API
    await this.showLoading();

    this._loginService.login(UserData).subscribe(
      async (response: any) => {
        // Ocultar el spinner una vez que llega la respuesta
        await this.hideLoading();

        if (!response.error) {
          this._loginService.saveToken(response.token); // Guardar el token
          
          // Redireccionar según el rol del usuario
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
            await this.showAlert('Error', 'No se ha podido identificar el usuario');
          }
        }
      },
      async (error: any) => {
        // Ocultar el spinner en caso de error
        await this.hideLoading();
        await this.showAlert('Error', error.error.message || 'Ocurrió un error inesperado');
      }
    );
  }

  // Método para cerrar sesión
  logout() {
    this._loginService.logout();
  }
}
