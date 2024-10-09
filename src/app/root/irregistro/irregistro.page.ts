import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';  // Importación del Router para la navegación

@Component({
  selector: 'app-irregistro',
  templateUrl: './irregistro.page.html',
  styleUrls: ['./irregistro.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IrregistroPage implements OnInit {

  constructor(private router: Router) { }  // Inyección del servicio Router

  ngOnInit() {
  }

  // Método para redirigir a la página de registro de peluquero
  goToRegistroPeluquero() {
    this.router.navigate(['/registropeluquero']);
  }
}
