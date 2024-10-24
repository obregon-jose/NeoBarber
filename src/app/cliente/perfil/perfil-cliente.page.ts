import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonInput, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencil } from 'ionicons/icons';
import { PerfilService } from '../services/perfil/perfil.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { AlertController } from '@ionic/angular/standalone';

// import { Camera, CameraResultType } from '@capacitor/camera';
import { ImagenService } from '../services/imagen/imagen.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: 'perfil-cliente.page.html',
  styleUrls: ['perfil-cliente.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonInput, IonList, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
   ],
   providers:[
    PerfilService,
    AlertToastService,
  
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

export class PerfilClientePage {
  user: any = {};
  imageUrl: string | null = null;

  constructor(
    private _perfilService:PerfilService,
    private alertController: AlertController,
    private _alert_loading_Service: AlertToastService,
    private ImagenService: ImagenService,
    
  ) {
    addIcons({ pencil });
  }

  ngOnInit() {
    this.mostrarPerfil();
  }

  async takePicture() {
    this.imageUrl = await this.ImagenService.takePicture() || null;
  }

  async uploadImage() {
    if (this.imageUrl) {
      const response = await this.ImagenService.uploadImage(this.imageUrl);
      console.log('Image uploaded:', response);
    }
   
  }

  
  

  async mostrarPerfil() {
    try {
      const data = await this._perfilService.cargarUsuario();
      this.user = data;
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  editarPerfil(data: any, id: number) {
    let UserData = {
      id: id,
      name: data.nombre
    };
    this._perfilService.editarPerfil(UserData);
    this.mostrarPerfil();
  }

  async openEditAlert(user: any) {
   
    const alert = await this.alertController.create({
      header: 'Editar usuario',
      message: 'Por favor, ingresa el nuevo nombre:',
      inputs: [
        {
          name: 'nombre',
          
          placeholder: 'Nombre',
          value: user.name // Prellenar el campo con el nombre actual
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
        },
        {
          text: 'GUARDAR',
          role: 'GUARDAR',
          handler: (data: any) => {
            if (data.nombre) {
              
              this.editarPerfil(data, user.id); // Llama a la función para editar el servicio
              return true
            } else {
              this._alert_loading_Service.alertToastYellow('Debe llenar todos los campos');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  
  }
  public alertInputs = [
    {
      name: 'nombre',
      placeholder: 'Nombre',
    }
  ];
  
}
