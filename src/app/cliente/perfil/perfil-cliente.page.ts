import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonInput, IonButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-perfil-cliente',
  templateUrl: 'perfil-cliente.page.html',
  styleUrls: ['perfil-cliente.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonList, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,
    FormsModule,
   ],
})
export class PerfilClientePage {
  user = {
    name: '',
    phone: '',
    email: '',
    photo: 'assets/images/profile.png',  // Ruta de una imagen por defecto
  };
  constructor() {}
  saveProfile() {
    // Aquí puedes implementar la lógica para guardar el perfil
    console.log('Perfil guardado', this.user);
    // Llamar a un servicio para actualizar los datos del usuario en el backend
  }
}
