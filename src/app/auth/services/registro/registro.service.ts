import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _alertService: AlertToastService,
  ) { }

  registroUser(data: any){
    return this._http.post<any>(this.apiUrl + '/users', data,).pipe(map((resp:any)=>{
      return resp
    }))
  }
  /*
  -------- REGISTRO DE USUARIO CON ROL --------
  */
  crearUsuarioConRol(data: any): Observable<any> {
    return from(this._tokenService.getHeaders()).pipe(
      switchMap((headers: HttpHeaders) => 
        this._http.post(`${this.apiUrl}/register`, data, { headers }).pipe(
          map((resp: any) => {
            return resp;
          }),
          catchError((error) => {
            this._alertService.alertToastRed('Error al crear el usuario', 'top');
            return throwError(() => error);
          })
        )
      ),
      catchError((error) => {
        this._alertService.alertToastRed('Error al obtener los encabezados', 'top');
        return throwError(() => error);
      })
    );
  }

}
