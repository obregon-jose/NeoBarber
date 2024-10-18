import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-reservar-peluquero',
  templateUrl: 'reservar.page.html',
  styleUrls: ['reservar.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ReservarPage {
  
  constructor(private router: Router) {} // Inyecta Router en el constructor

  navigateToSelectBarber() {
    this.router.navigate(['/peluquero/reservar/seleccionarbarbero']); // Método para redirigir
  }
}
