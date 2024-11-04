import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonLabel, IonText, IonItem } from '@ionic/angular/standalone';
import { pencil } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonItem, IonText, IonLabel, IonList, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProfilePage implements OnInit {
  user: any = {};
  imageUrl: string | null = null;

  constructor(
    private _profileService: ProfileService,
    private alertController: AlertController,
    private _alert_loading_Service: ToastService,
    private _authService: AuthService,
    
  ) {
    addIcons({ pencil });
  }

  ngOnInit() {
    this.mostrarPerfil();
  }
  
  async tomarFoto(id: number) {
    this.imageUrl = await this._profileService.takePicture() || null;
    this.subirImagen(id);
  }

  async selecionarImagen(id: number) {
    this.imageUrl = await this._profileService.selectPicture() || null;
    this.subirImagen(id);
  }

  async subirImagen(id: number) {
    if (this.imageUrl) {
      await this._profileService.uploadImage(this.imageUrl, id);
    }
    return this.mostrarPerfil();
  }

  async mostrarPerfil() {
    try {
      const data = await this._profileService.cargarUsuario();
      this.user = data;
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  editarPerfil(data: any, id: number) {
    let UserData = {
      id: id,
      name: data.nombre,
      phone:data.phone,
      nickname:data.nickname
    };
     this._profileService.editarPerfil(UserData);
    this.mostrarPerfil();
  }

  //Cerrar sesión
  logout() {
    this._authService.logout();
  }
//alerta para cerrar sesión
  async LogoutAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.logout();
          }
        },
      ]
    });
    await alert.present();
  }
  
  //alerta para editar imagen
  async openImageOptionsAlert(userId: number) {
    const alert = await this.alertController.create({
      header: 'Seleccionar opción',
      buttons: [
        {
          text: 'Galería',
          handler: () => {
            this.selecionarImagen(userId);
          }
        },
        {
          text: 'Cámara',
          handler: () => {
            this.tomarFoto(userId);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
  
    await alert.present();
  }
  

  //alerta para editar perfil
  async openEditAlert(user: any) {

    const alert = await this.alertController.create({
      header: 'Editar usuario',
      message: '',
      inputs: [
        {
          name: 'nombre',

          placeholder: 'Nombre',
          value: user.name // Prellenar el campo con el nombre actual
        },
        {
          name: 'nickname',
          placeholder: 'apodo',
          type:'text',
          value: user.detail?.nickname // Prellenar el campo con el precio actual
          
        },
        {
          name: 'phone',
          placeholder: 'telefono',
          type:'tel',
          value: user.detail?.phone, // Prellenar el campo con el precio actual
          attributes: {
            inputmode: 'numeric',
            minlength: 8,
            maxlength: 10,
          }
        },
        
      ],
      buttons: [
        {
          text: 'CANCELAR',
        },
        {
          text: 'GUARDAR',
          role: 'GUARDAR',
          handler: (data: any) => {
            const phoneRegex = /^\d{8,}$/;
            
            if (data.phone && !phoneRegex.test(data.phone)) {
              this._alert_loading_Service.toastYellow('El teléfono debe tener al menos 8 dígitos.');
              return false; // Evitar el envío
            }
            if (data.nombre) {

              this.editarPerfil(data, user.id); // Llama a la función para editar el servicio
              return true
            } else {
              this._alert_loading_Service.toastYellow('Debe llenar todos los campos');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();

  }

}
