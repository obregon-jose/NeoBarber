import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { TokenService } from 'src/app/auth/services/get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _alert_loading_Service: AlertToastService,
    private _tokenService: TokenService,
  ) { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
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

    const res = await fetch(`${this.apiUrl}/subir-imagen/`+id,  {
      method: 'POST',
      // headers: {
      //   'Authorization': `Bearer ${token}`, // Si necesitas autenticación
      // },
      body: formData,
    });

    return await res.json();
  }

}
