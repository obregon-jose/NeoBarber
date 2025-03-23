import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
    selector: 'app-root',
    templateUrl: './root.page.html',
    styleUrls: ['./root.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RootPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
