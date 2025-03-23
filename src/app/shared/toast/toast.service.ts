import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
    private alertController:AlertController,
    private loadingController: LoadingController,
  ) { }

  async toastGreen(message: string, position: 'top' | 'middle' | 'bottom' = 'top', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'success',
    });
    toast.present();
  }
  async toastRed(message: string = 'No pudimos conectar con el servidor. Por favor vuelve a intentarlo.', position: 'top' | 'middle' | 'bottom' = 'top', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: 'danger',
    });
    toast.present();
  }
  async toastYellow(message: string, position: 'top' | 'middle' | 'bottom' = 'top', duration: number = 3000) {
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
