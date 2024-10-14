import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFabButton, IonIcon, IonItem, IonCheckbox, IonFab, IonTabs, IonTabBar, IonTabButton, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ServiciosService } from '../services/servicios/servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-servicios',
  templateUrl: 'servicios.page.html',
  styleUrls: ['servicios.page.scss'],
  standalone: true,
  imports: [IonLabel, IonListHeader, IonTabButton, IonTabBar, IonTabs, IonFab, IonCheckbox, IonItem, IonIcon, IonFabButton, IonList, IonHeader, IonToolbar, IonTitle, IonContent, NgFor,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers:[
    ServiciosService,
  ]
   
})
export class ServiciosPage implements OnInit {
  precio: number=0;
  nombre: string='';
  services: any[] = [];

  constructor(
     private _serviciosServicie:ServiciosService
  ) {}
  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios(){
    this._serviciosServicie.mostrarServicios().subscribe(Response=>{
      this.services = Response.services;
    },
    error=>{
      console.log('error')
    })
  }

}
