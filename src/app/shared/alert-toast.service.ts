import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Toast, ToastPlugin } from '@capacitor/toast';
@Injectable({
  providedIn: 'root'
})
export class AlertToastService {

  constructor(
    private toastController: ToastController,
    private alertController:AlertController,
    private loadingController: LoadingController,
    private router: Router, 
    // private _toastController: ToastPlugin,
  ) { }

  // Método para mostrar el toast TEMPORAL

  // Método para mostrar un Toast
  public async showToast(message: string) {
    await Toast.show({
      text: message,
      duration: 'long',
    });
  }
  public async showToast1(message: string, duration: 'short' | 'long' = 'long', position: 'top' | 'middle' | 'bottom' = 'top', color: 'success' | 'danger' | 'warning' = 'warning') {
    const toast = await this.toastController.create({
      message: message,
      // duration: duration === 'short' ? 2000 : 4000, // Convert 'short' and 'long' to milliseconds
      // position: position,
      color: color,
    });
    // toast.present();
  }
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
