import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem, IonText, IonLabel, IonList, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { pencil, logOut, person, callOutline, personOutline, mailOutline, call, mail, camera, ellipsisVertical, createOutline, logOutOutline, timeOutline, time } from 'ionicons/icons';
import { AlertController } from '@ionic/angular/standalone';
import { ChangeDetectorRef } from '@angular/core';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
    imports: [IonItem, IonLabel, IonCardTitle, IonCardHeader, IonIcon, IonButton, IonContent, CommonModule, FormsModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PerfilPage implements OnInit {
  user: any = {};
  userRole: string = '';
  imageUrl: string | null = null;

  popoverOpen = false;
  popoverEvent: any;

  constructor(
    private _profileService: ProfileService,
    private alertController: AlertController,
    private _alert_loading_Service: ToastService,
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    addIcons({camera,personOutline,callOutline,mailOutline,time,pencil,logOut,ellipsisVertical,createOutline,logOutOutline,timeOutline,person,call,mail});
  }

  async ngOnInit() {
    this.mostrarPerfil();
    this.cargarRol();this.userRole = (await this._authService.getRole()) ?? '';
  }
  showTab(tab: string): boolean {
    return tab === this.userRole;
  }
  ionViewWillEnter() {
    this.mostrarPerfil();
  }

  async cargarRol() {
    this.userRole = (await this._authService.getRole()) ?? '';
  }

  async tomarFoto(id: number) {
    try {
      this.imageUrl = await this._profileService.takePicture() || null;
      await this.subirImagen(id);
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  async selecionarImagen(id: number) {
    try {
      this.imageUrl = await this._profileService.selectPicture() || null;
      await this.subirImagen(id);
    } catch (error) {
      console.error('Error al seleccionar la imagen', error);
    }
  }

  async subirImagen(id: number) {
    if (this.imageUrl) {
      try {
        await this._profileService.uploadImage(this.imageUrl, id);
        await this.mostrarPerfil();
        this._changeDetectorRef.detectChanges();
      } catch (error) {
        console.error('Error al subir la imagen', error);
      }
    }
  }

  async mostrarPerfil() {
    try {
      const data = await this._profileService.cargarUsuario();
      this.user = data;
    } catch (error) {
      console.error('Error al cargar el perfil', error);
    }
  }

  async editarPerfil(data: any, id: number) {
    const userData = {
      id: id,
      name: data.nombre,
      phone: data.phone,
      nickname: data.nickname
    };

    try {
      await this._profileService.editarPerfil(userData);
      await this.mostrarPerfil();
      this._changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error al editar el perfil', error);
    }
  }

  async logoutAlert() {
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
            this._authService.logout();
          }
        },
      ]
    });
    await alert.present();
  }

  async openImageOptionsAlert(userId: number) {
    const alert = await this.alertController.create({
      header: 'Seleccionar opción',
      buttons: [
        {
          text: 'Galería',
          handler: () => this.selecionarImagen(userId)
        },
        {
          text: 'Cámara',
          handler: () => this.tomarFoto(userId)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async navigateToHorario() {
    await this.closePopover();
    this.router.navigate(['/tabs/horario']);
  }

  async presentPopover(event: Event) {
    this.popoverEvent = event;
    this.popoverOpen = true;
  }

  closePopover() {
    this.popoverOpen = false;
  }

  onEdit() {
    this.closePopover();
    this.openEditAlert(this.user);
  }

  onLogout() {
    this.closePopover();
    this.logoutAlert();
  }

  async openEditAlert(user: any) {
    const alert = await this.alertController.create({
      header: 'Editar usuario',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: user.name
        },
        {
          name: 'nickname',
          placeholder: 'Apodo',
          type: 'text',
          value: user.detail?.nickname,
          attributes: {
            hidden: this.userRole !== 'peluquero'
          }
        },
        {
          name: 'phone',
          placeholder: 'Teléfono',
          type: 'tel',
          value: user.detail?.phone,
          attributes: {
            inputmode: 'numeric',
            minlength: 8,
            maxlength: 10
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: (data: any) => {
            const phoneRegex = /^\d{8,}$/;

            if (data.phone && !phoneRegex.test(data.phone)) {
              this._alert_loading_Service.toastYellow('El teléfono debe tener al menos 8 dígitos.');
              return false;
            }

            if (data.nombre) {
              this.editarPerfil(data, user.id);
              return true;
            } else {
              this._alert_loading_Service.toastYellow('Debe llenar todos los campos.');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
