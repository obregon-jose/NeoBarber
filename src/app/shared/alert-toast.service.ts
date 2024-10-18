import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertToastService {

  constructor(
    private toastController: ToastController,
    private alertController:AlertController,
  ) { }

  // Método para mostrar el toast TEMPORAL
  async alertToastGreen(message: string, position: 'top' | 'middle' | 'bottom', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'success',
    });
    toast.present();
  }
  async alertToastRed(message: string, position: 'top' | 'middle' | 'bottom', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'danger',
    });
    toast.present();
  }
  async alertToastYellow(message: string, position: 'top' | 'middle' | 'bottom', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'warning',
    });
    toast.present();
  }

  showAlert(header: string, message: string, buttons: string[] = ['OK']){
    this.alertController.create({
      header:header, 
      message:message,
      buttons: buttons,
    }).then(alert=>alert.present());
  }

}
