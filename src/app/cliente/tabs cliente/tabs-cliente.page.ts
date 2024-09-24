import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, person,create,home } from 'ionicons/icons';

@Component({
  selector: 'app-tabs-cliente',
  templateUrl: 'tabs-cliente.page.html',
  styleUrls: ['tabs-cliente.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,],
})
export class TabsClientePage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square, person,create, home});
  }
}
