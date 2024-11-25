import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
  IonButton, IonGrid, IonRow, IonCol, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { ReservarService } from 'src/app/services/reservar/reservar.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
  standalone: true,
  imports: [IonLabel, RouterLink,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ClientPage implements OnInit {

  reservas: any[] = [];

  // Información de la próxima cita
  nextAppointment = {
    peluquero: '',
    fecha: '',
    hora: ''
  };

  // Lista de imágenes
  images = [
    'assets/images/Corte1.jpg',
    'assets/images/Corte2.jpeg',
    'assets/images/corte3.jpeg',
    'assets/images/corte4.jpeg'
  ];

  constructor(
    private _reservarService:ReservarService,
  ) {}

  ngOnInit(
    
  ) {
    // this.cargarUsuario();
    this.mostrarReservas();
  }

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

  // async mostrarReservas() {
  //   const { value } = await Preferences.get({ key: 'user' });
  //   const userAuth = value ? JSON.parse(value) : {};
  //   try {
  //     const data = await this._reservarService.cargarReservasCliente(userAuth.id);
  //     this.reservas = data; 
  //     this.reservas.sort((a, b) => b.id - a.id); // Ordena las reservas por id de forma descendente
  //     console.log('reservas cliente pendientes, canceladas y completadas',this.reservas);
       
  //   } catch (error) {
  //     console.error('Error al cargar los servicios', error);
  //   }
  // }
  // async mostrarReservas() {
  //   const { value } = await Preferences.get({ key: 'user' });
  //   const userAuth = value ? JSON.parse(value) : {};
  //   try {
  //     const data = await this._reservarService.cargarReservasCliente(userAuth.id);
  //     this.reservas = data;
      
  //     // Filtrar solo las reservas pendientes
  //     const reservasPendientes = this.reservas.filter(reserva => reserva.status === 'pending');
      
  //     // Si hay reservas pendientes, ordenarlas por fecha y hora
  //     if (reservasPendientes.length > 0) {
  //       reservasPendientes.sort((a, b) => {
  //         const fechaA = new Date(a.fecha + ' ' + a.hora);
  //         const fechaB = new Date(b.fecha + ' ' + b.hora);
  //         return fechaA.getTime() - fechaB.getTime();
  //       });

  //       // Asignar la reserva más próxima a nextAppointment
  //       const reservaMasProxima = reservasPendientes[0];
  //       this.nextAppointment = {
  //         peluquero: reservaMasProxima.barber_name,  // Ajusta según tu estructura
  //         fecha: reservaMasProxima.date,
  //         hora: reservaMasProxima.time
  //       };
  //     } else {
  //       console.log('No hay reservas pendientes');
  //     }
  //     console.log('Reservas cliente pendientes:', reservasPendientes);
  //   } catch (error) {
  //     console.error('Error al cargar las reservas', error);
  //   }
  // }
  
  // async cargarUsuario() {
  //   let userAuth: any = null;
  
  //   while (!userAuth) {
  //     const { value } = await Preferences.get({ key: 'user' });
  //     userAuth = value ? JSON.parse(value) : null;
  
  //     if (!userAuth) {
  //       //console.log('Esperando a que los datos del usuario estén disponibles...');
  //       await this.delay(500); // Esperar 500ms antes de intentar de nuevo
  //     }
  //   }
  
  //   //console.log('Usuario autenticado encontrado:', userAuth);
  //   this.mostrarReservas();
  
  // }

  // delay(ms: number): Promise<void> {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  
  async mostrarReservas() {
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};
    //console.log("user autg",userAuth);
    try {
      const data = await this._reservarService.cargarReservasCliente(userAuth.id);
      this.reservas = data;
  
      // Filtrar solo las reservas pendientes
      const reservasPendientes = this.reservas.filter(reserva => reserva.status === 'pending');
  
      // Si hay reservas pendientes, ordenarlas por fecha y hora
      if (reservasPendientes.length > 0) {
        // Filtrar reservas futuras
        const now = new Date();
        const reservasFuturas = reservasPendientes.filter(reserva => {
          const reservaDateTime = new Date(`${reserva.date}T${reserva.time}`);
          return reservaDateTime > now; // Solo reservas futuras
        });
  
        if (reservasFuturas.length > 0) {
          // Ordenar reservas futuras por fecha y hora
          reservasFuturas.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`).getTime();
            const dateB = new Date(`${b.date}T${b.time}`).getTime();
            return dateA - dateB; // Orden ascendente
          });
        }
  
        if (reservasFuturas.length > 0) {
          // Asignar la reserva más próxima a nextAppointment
          const reservaMasProxima = reservasFuturas[0];
          this.nextAppointment = {
            peluquero: reservaMasProxima.barber_name,  // Ajusta según tu estructura
            fecha: reservaMasProxima.date,
            hora: reservaMasProxima.time
          };
          console.log("reservas futuras",reservasFuturas);
        } else {
          console.log('No hay reservas futuras');
        }
      } else {
        console.log('No hay reservas pendientes');
      }
      console.log('Reservas cliente pendientes:', reservasPendientes);
      console.log('Próxima cita:', this.nextAppointment);
      
    } catch (error) {
      console.error('Error al cargar las reservas', error);
    }
  }
  

  formatHour(hour: string): string {
    const [hours, minutes] = hour.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hourInt + 11) % 12 + 1).toString().padStart(2, '0'); // Convierte de 24h a 12h
    return `${formattedHour}:${minutes} ${suffix}`;
  }
}
