import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { UserRecover } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {
  private apiUrl = environment.apiUrl;

  constructor(
  ) { }

  //PENDIENTE MODIFICAR A LOGIDA DE EXPIRACION

  // Solicitar código de restablecimiento de contraseña
  async sendCode(UserEmail: UserRecover): Promise<HttpResponse> {
    const options = {
      url: `${this.apiUrl}/reset-password/send-code`,
      data: UserEmail,
      headers: { 'Content-Type': 'application/json' },
    };

    const response: HttpResponse = await CapacitorHttp.post(options);
    return response;
  }

  // Verificar código de restablecimiento
  async verifyCode(userVerify: UserRecover): Promise<HttpResponse> {
    const options = {
      url: `${this.apiUrl}/reset-password/verify-code`,
      data: userVerify,
      headers: { 'Content-Type': 'application/json' },
    };

    const response: HttpResponse = await CapacitorHttp.post(options);
    return response;
  }

  // Restablecer contraseña
  async updatePassword(userUpdate: UserRecover): Promise<HttpResponse> {
    const options = {
      url: `${this.apiUrl}/reset-password/update-password`,
      data: userUpdate,
      headers: { 'Content-Type': 'application/json' },
    };

      const response: HttpResponse = await CapacitorHttp.post(options);
      return response;
  }

}
