import { App } from '@capacitor/app';  // Importa App para detectar el cierre de la app
import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NetworkService } from './shared/services/network/network.service';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from './shared/services/storage/storage.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [IonApp, IonRouterOutlet,
    ]
})
export class AppComponent implements OnInit {

  constructor(
    private _networkService: NetworkService,
    private _storageService: StorageService,
    private router: Router,
    private navCtrl: NavController, // Cambia NavController por IonRouterOutlet
  ) {
    this._networkService.isOnline();

    // Agregar el listener para detectar cuando la app pierde foco
    App.addListener('appStateChange', (state) => {
      if (!state.isActive) {
        // Elimina la pantalla almacenada cuando la app se cierra
        this._storageService.removeData('lastScreen');
      }
    });

  }

  ngOnInit() {
    // Intenta recuperar la última pantalla visitada cuando la app se inicie
    this.restoreLastScreen();

    // Escucha los cambios de navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.saveCurrentScreen(event.url);
      }
    });
  }

  // Guarda la pantalla actual
  saveCurrentScreen(screenName: string) {
    this._storageService.setData('lastScreen', screenName); 
  }

  // Recupera la última pantalla visitada y navega hacia ella
  restoreLastScreen() {
    this._storageService.getData<string>('lastScreen').then((value) => {
      if (value) {
        // this.navCtrl.navigateForward(value); // Cambia navigateByUrl por navigateForward para evitar problemas de navegación
        this.router.navigateByUrl(value); 
      } 
      // else {
        // this.router.navigateByUrl('/tabs'); 
      // }
    });
  }

}


// import { Component, OnInit } from '@angular/core';
// import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
// import { NetworkService } from './shared/services/network/network.service';

// import { StorageService } from './shared/services/storage/storage.service';
// import { NavController } from '@ionic/angular';
// import { LastScreenService } from './shared/services/last-screen/last-screen.service';

// @Component({
//     selector: 'app-root',
//     templateUrl: 'app.component.html',
//     imports: [IonApp, IonRouterOutlet,
//     ]
// })
// export class AppComponent implements OnInit {

//   constructor(
//     private _networkService: NetworkService,
//     private _lastScreenService: LastScreenService,
//   ) {
//     this._networkService.isOnline();
//     this._lastScreenService.screenStateApp();
//   }

//   ngOnInit() {
//     this._lastScreenService.restoreLastScreen();
//     this._lastScreenService.screenStateEvent();
   
//   }

// }
