import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _storageService: StorageService,
  ) { }

  // Caegamos el usuario desde AuthService -> userAuthenticated()

  async updateProfile(userUpdate: any): Promise<void> {
    const token = await this._storageService.getTokenData(); 
    const options = {
      url: `${this.apiUrl}/user-details/${userUpdate.id}`,
      data: userUpdate,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };    
    const response: HttpResponse = await CapacitorHttp.put(options);
    return response.data;
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


}
