import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertToastService {

  constructor(
    private toastController: ToastController,
    private alertController:AlertController,
    private loadingController: LoadingController,
    private router: Router, 
  ) { }

  // Método para mostrar el toast TEMPORAL
  async alertToastGreen(message: string, position: 'top' | 'middle' | 'bottom' = 'top', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'success',
    });
    toast.present();
  }
  async alertToastRed(message: string, position: 'top' | 'middle' | 'bottom' = 'top', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'danger',
    });
    toast.present();
  }
  async alertToastYellow(message: string, position: 'top' | 'middle' | 'bottom' = 'top', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'warning',
    });
    toast.present();
  }
  // Método para mostrar alertas con boton
  showAlert(header: string, message: string, buttons: string[] = ['OK']){
    this.alertController.create({
      header:header, 
      message:message,
      buttons: buttons,
    }).then(alert=>alert.present());
  }

  // Mostrar loading de carga 
  async presentLoading( message: string = 'Cargando...', _spinner: 'bubbles' | 'circles' | 'circular' | 'crescent' | 'dots' | 'lines' | 'lines-small' | 'lines-sharp' | 'lines-sharp-small' | null | undefined = 'crescent') {
    const loading = await this.loadingController.create({
      message: message,
      spinner: _spinner,
    });
    await loading.present();
    return loading;
  }

}
