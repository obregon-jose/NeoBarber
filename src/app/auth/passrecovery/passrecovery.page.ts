import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, } from '@ionic/angular/standalone';
import { RestablecerContraseñaService } from '../services/restablecer-contraseña/restablecer-contraseña.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passrecovery',
  templateUrl: './passrecovery.page.html',
  styleUrls: ['./passrecovery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton,
    HttpClientModule, ReactiveFormsModule,
  ],
  providers: [RestablecerContraseñaService, ]
})
export class PassrecoveryPage implements OnInit {
  email: string = '';
  code: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private passwordService: RestablecerContraseñaService,
    private route: ActivatedRoute, 
    private router: Router
  ) { 
    // this.email = this.route.snapshot.queryParams['email'];
  }

  ngOnInit() {
  }

  solicitarCodigo() {
    this.passwordService.sendResetCode(this.email);
  }

  verificarCodigo() {
    this.passwordService.verifyCode(this.code, this.email);

      // Navegar a la pantalla de nueva contraseña
      // this.router.navigate(['/password-new'], { queryParams: { email: this.email } });
  }

  actualizarContrasena() {
    this.passwordService.resetPassword(this.email, this.newPassword);
  }

}
