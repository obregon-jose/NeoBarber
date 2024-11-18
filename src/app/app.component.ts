import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
// import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,
  ],
})
export class AppComponent {

  constructor() {
    
    // this.showSplash();
  }

  // async showSplash() {
  //   await SplashScreen.hide();
  //   // Show the splash for an indefinite amount of time:
  //   await SplashScreen.show({
  //     autoHide: true,
  //     showDuration: 3000,
  //   });
  // }

}
