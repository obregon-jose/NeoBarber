import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegistroPeluqueroService {
  
  private apiUrl=environment.apiUrl;
  constructor(
    private _http:HttpClient,
  ) { }


  async registerBarber(UserData: any): Promise<any> {
    const token = await this.getToken();
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    try {
      // Realizar la solicitud post y devolver la promesa
      return this._http.post(`${this.apiUrl}/register`, UserData, { headers }).toPromise();
    } catch (error) {
      console.error('Error durante el registro:', error);
      // Rechazar la promesa con el error
      return Promise.reject(error);
    }
  }
  


  getToken = async () => {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  };
}