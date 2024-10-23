import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonInput, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencil } from 'ionicons/icons';
import { PerfilService } from '../services/perfil/perfil.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';



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

  constructor(
    private _perfilService:PerfilService,
    
  ) {
    addIcons({ pencil });
  }

  ngOnInit() {
    this.mostrarPerfil();
  }
  

  async mostrarPerfil() {
    try {
      const data = await this._perfilService.cargarUsuario();
      this.user = data;
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  editarUsuario(data: any, id: number) {
    let UserData = {
      id: id,
      name: data.nombre,
      price: data.precio,
    };
    this._perfilService.editarUsuario(UserData);
    this.mostrarPerfil();
  }

}
