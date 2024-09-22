import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonList,IonItem,IonInput, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList,IonItem,IonInput,IonButton,IonFooter,IonGrid,IonCol,IonRow,IonLabel, ]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
