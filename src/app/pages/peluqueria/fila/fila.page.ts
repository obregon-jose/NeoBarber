import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonAccordionGroup,IonPopover, IonAccordion, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, calendarOutline } from 'ionicons/icons';
import { ReservarService } from 'src/app/services/reservar/reservar.service';
import { NgFor,NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ToastService } from 'src/app/shared/toast/toast.service';
// import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-fila',
    templateUrl: './fila.page.html',
    styleUrls: ['./fila.page.scss'],
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon, IonAccordionGroup, IonAccordion, NgFor, NgIf, CommonModule, FormsModule,
        IonPopover],
    schemas: [NO_ERRORS_SCHEMA]
})
export class FilaPage implements OnInit {


  @ViewChild('accordionGroup', { static: false }) accordionGroup!: IonAccordionGroup;
  reservas: any[] = [];
  fechaSeleccionada: string = '';
  dias: { fecha: Date; nombre: string; numero: number }[] = [];
  diaSeleccionado: Date | null = null;


  constructor(
    private _reservarService:ReservarService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private _alert_loading_Service: ToastService,
  ) {

    addIcons({ chevronDownOutline, calendarOutline });
  }

  ngOnInit() {
  
    this.generarDias();
    this.seleccionarDia(new Date());

    // this.cargarUsuario();
    
    
    this.mostrarReservas();
    //console.log("ng on init")
  }
  


  async generarDias() {
    const hoy = new Date();
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    for (let i = 0; i < 8; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      this.dias.push({
        fecha: fecha,
        nombre: diasSemana[fecha.getDay()],
        numero: fecha.getDate()
      });
    }
  }

  
  async seleccionarDia(fecha: Date) {
    if (this.accordionGroup) {
      this.accordionGroup.value = null;
    }
    
    this.diaSeleccionado = fecha;
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.fechaSeleccionada = fecha.toLocaleDateString('es-ES', opciones);
    await this.mostrarReservas();
    //console.log('Fecha seleccionada:', this.fechaSeleccionada);
  }

  async mostrarReservas() {
    if (this.accordionGroup) {
      this.accordionGroup.value = null;
    }
    try {
      const { value } = await Preferences.get({ key: 'user' });
      const userAuth = value ? JSON.parse(value) : {};
      //console.log("user autg",userAuth);
      const data = await this._reservarService.cargarReservasPeluquero(userAuth.id);
      //console.log('data',data);
      this.reservas = data;  
      console.log('reservas pendientes peluquero',this.reservas);  
      //this.cdr.detectChanges();
      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  esDiaSeleccionado(fecha: Date): boolean {
    return this.diaSeleccionado?.toDateString() === fecha.toDateString();
    
    
  }


  get reservasFiltradas(): any[] {
    if (!this.diaSeleccionado) {
      console.log('No hay día seleccionado');
      return this.reservas; // Si no hay día seleccionado, mostrar todas las reservas
    }
  
    // Filtrar las reservas por la fecha seleccionada
    const reservasFiltradas = this.reservas.filter(reserva => {
      // Validar que la reserva tiene el objeto 'reservation' y el campo 'date'
      if (!reserva.reservation || !reserva.reservation.date) {
 
        return false; // Excluir las reservas con datos incompletos
      }
  
      const fechaReserva = reserva.reservation.date; // Fecha de la reserva en formato YYYY-MM-DD
      const fechaSeleccionada = this.diaSeleccionado ? this.formatFechaLocal(this.diaSeleccionado) : ''; // Fecha seleccionada formateada
  
      return fechaReserva === fechaSeleccionada; // Comparar fechas
    });
  
    // Ordenar las reservas por el campo 'time'
    reservasFiltradas.sort((a, b) => {
      return a.reservation.time.localeCompare(b.reservation.time); // Ordenar por string de tiempo
    });
  
    return reservasFiltradas; // Devolver el resultado ordenado
  }

  async cancelarReserva(data: any) {
    let ReservationData = {
      id: data.id,
      barber_id: data.barber_id,
    };
    await this._reservarService.cancelarReserva(ReservationData); // espera la edición
    await this.mostrarReservas(); // luego recarga los servicios

  }
  async confirmarReserva(data: any,id:number) {
    //console.log(data," Data al entrar a confirmar reservacion")
    let ReservationData = {
      id: id,
      total_paid: data.precio,
    };
    
    //console.log(ReservationData," Data reservacion que se va indefinido")
    await this._reservarService.confirmarReservaPeluquero(ReservationData); // espera la edición
    await this.mostrarReservas(); // luego recarga los servicios

  }

  async confirmarReservaAlert(reserva: any) {
    const alert = await this.alertController.create({
      header: 'Precio pagado',
      inputs: [
        {
          name: 'precio',
          placeholder: 'Precio',
          value: this.formatPriceShow(reserva.total_paid), // Prellenar el campo con el precio actual
          type: 'text',
          attributes: {
            inputmode: 'numeric',
            maxlength: 6,
            oninput: (event: any) => this.formatPrice(event)
          }
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
        },
        {
          text: 'CONFIRMAR',
          role: 'GUARDAR',
          handler: (data: any) => {
            if (data.precio) {
              data.precio = this.removeFormatting(data.precio);
              this.confirmarReserva(data, reserva.id); // Llama a la función para editar el servicio
              console.log('data en alerta:', data, 'reserva id:', reserva.id
              );
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
  
  
  // Función para formatear la fecha localmente en formato YYYY-MM-DD
  formatFechaLocal(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }
  
  
  formatHour(hour: string): string {
    const [hours, minutes] = hour.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hourInt + 11) % 12 + 1).toString().padStart(2, '0'); // Convierte de 24h a 12h
    return `${formattedHour}:${minutes} ${suffix}`;
  }

  async cancelarAlert(data: any) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que desea cancelar la reserva?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Cancelar reserva',
          handler: () => {
            this.cancelarReserva(data);
          }
        },
      ]
    });
    await alert.present();
  }


  
  formatPrice(event: any) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return input.value = value;
  }
  removeFormatting(value: string): number {
    return parseInt(value.replace(/\./g, ''), 10);
  }

  formatPriceShow(value: number): string {
    let stringValue = value.toString().replace(/\D/g, '');
    stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return stringValue;
  }

  getFormattedPrice(price: number): string {
    return this.formatPriceShow(price);
  }
}