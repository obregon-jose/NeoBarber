import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonRow, IonCard, IonProgressBar } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-seleccionarbarbero-peluquero',
  templateUrl: 'seleccionarbarbero.page.html',
  styleUrls: ['seleccionarbarbero.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // Añade CommonModule aquí
    IonCard,
    IonRow,
    IonCol,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonProgressBar // Añade IonProgressBar aquí
  ],
})
export class SeleccionarBarberoPage {
  barbers: any[] = []; // Array para almacenar los barberos
  progressValue: number = 0.33; // Valor inicial para la barra de progreso

  constructor(private router: Router) {
    this.loadBarbers(); // Cargar los barberos en el constructor
  }

  loadBarbers() {
    // Simulación de datos desde una API
    this.barbers = [
      {
        name: 'Mac Miller',
        subtitle: 'El mono',
        image: 'assets/images/sebastian.jpeg'
      },
      {
        name: 'Sebastián Yatra',
        subtitle: 'El mago',
        image: 'assets/images/sebastian.jpeg'
      },
      {
        name: 'Johnny Sins',
        subtitle: 'Arcángel',
        image: 'assets/images/sebastian.jpeg'
      },
      {
        name: 'Ronny Red',
        subtitle: 'El Cholo',
        image: 'assets/images/sebastian.jpeg'
      }
    ];
  }

  selectBarber(barber: any) {
    // Redirigir a la vista de selección de día y hora
    this.router.navigate(['/peluquero/reservar/fechayhora'], {
      queryParams: { barberName: barber.name }
    });
  }
}
