import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _authService: AuthService,
    private _alert_loading_Service: ToastService,
  ) { }

  async cargarUsuario(): Promise<any> {
    const token = await this._authService.getToken();
    const options = {
      url: `${this.apiUrl}/user`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      await loading.dismiss();
      return response.data
    } catch (error) {
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
    }
  }

  async editarPerfil(data: any): Promise<void> {
    const token = await this._authService.getToken();
    const options = {
      url: `${this.apiUrl}/user-details/${data.id}`,
      data: {
        name: data.name,
        nickname: data.nickname, 
        phone: data.phone,       
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.put(options);
      if (response.status === 200) {
        this._alert_loading_Service.toastGreen(response.data.message );
        await loading.dismiss();
      } else {console.log('fallido', response);
        this._alert_loading_Service.toastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    return image.webPath;
  }

  async selectPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    return image.webPath;
  }

  async uploadImage(imageUrl: string, id: number): Promise<any> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('image', blob);

    console.log('formData: ', formData);


    const res = await fetch(this.apiUrl+'/subir-imagen/'+id, {
      method: 'POST',
      // headers: {
      //   'Authorization': `Bearer ${token}`, // Si necesitas autenticación
      // },
      body: formData,
    });

    return await res.json();
  }
  async uploadImage0(imageUrl: string, id: number): Promise<void> {
    const token = await this._authService.getToken();

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('image', blob);

    console.log('formData', formData);

    const options = {
      url: `${this.apiUrl}/subir-imagen/${id}`,
      photo: formData,
      data: {
        photo: formData,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 201) { 
        this._alert_loading_Service.toastGreen(response.data.message);
        await loading.dismiss();
      } else {console.log('fallido', response);
        this._alert_loading_Service.toastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
    }
  }


}
