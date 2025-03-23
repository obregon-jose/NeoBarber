import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NetworkService } from './services/network/network.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [IonApp, IonRouterOutlet,
    ]
})
export class AppComponent {

  constructor(
    private networkService: NetworkService, 
  ) {
    this.networkService.isOnline();
  }
}
