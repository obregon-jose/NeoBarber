import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from 'src/app/auth/services/get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = environment.apiUrl+'/services';

  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _alertService: AlertToastService
  ) { }

  // Método para cargar servicios
  cargarServicios(): Observable<any> {
    return this._tokenService.getHeaders().pipe(
      switchMap((headers) => {
        return this._http.get(this.apiUrl, { headers });
      })
    );
  }

  // mostrarUnServicio(data: any){}
  
  // Crear un servicio
  crearServicio(data: any): Observable<any> {
    return from(this._tokenService.getHeaders()).pipe(
      switchMap((headers: HttpHeaders) => 
        this._http.post(this.apiUrl, data, { headers }).pipe(
          map((resp: any) => {
            return resp;
          }),
          catchError((error) => {
            this._alertService.alertToastRed('Error al crear el servicio', 'top');
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

  //Editar un servicio
  editarServicios(data: any): Observable<any> {
    return from(this._tokenService.getHeaders()).pipe(
      switchMap((headers: HttpHeaders) =>
        this._http.put(`${this.apiUrl}/${data.id}`, data, { headers }).pipe(
          map((resp: any) => {
            return resp;
          }),
          catchError((error) => {
            this._alertService.alertToastRed('Error al editar el servicio', 'top');
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

  //Eliminar servicio
  eliminarServicios(id: number): Observable<any> {
    return from(this._tokenService.getHeaders()).pipe(
      switchMap((headers: HttpHeaders) =>
        this._http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
          map((resp: any) => {
            return resp;
          }),
          catchError((error) => {
            this._alertService.alertToastRed('Error al eliminar el servicio');
            return throwError(() => error);
          })
        )
      ),
      catchError((error) => {
        this._alertService.alertToastRed('Error al obtener los encabezados');
        return throwError(() => error);
      })
    );
  }



}
