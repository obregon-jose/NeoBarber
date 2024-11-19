import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
  IonButton, IonGrid, IonRow, IonCol, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
  standalone: true,
  imports: [IonLabel, RouterLink,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule
  ]
})
export class ClientPage implements OnInit {
  // Información de la próxima cita
  nextAppointment = {
    peluquero: 'Pepe López',
    fecha: '2024-11-20',
    hora: '3:00 PM'
  };

  // Lista de imágenes
  images = [
    'assets/images/Corte1.jpg',
    'assets/images/Corte2.jpeg',
    'assets/images/corte3.jpeg',
    'assets/images/corte4.jpeg'
  ];

  constructor() {}

  ngOnInit() {}

  // Métodos para los botones
  reservarCita() {
    console.log('Navegando a la página de Reservar Cita...');
  }

  editarPerfil() {
    console.log('Navegando a la página de Editar Perfil...');
  }

  citaRapida() {
    console.log('Iniciando Cita Rápida...');
  }
}
