import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private apiUrl = environment.apiUrl;
  constructor(
    

  ) { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    return image.webPath;
  }

  async uploadImage(imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('image', blob, 'filename.jpg');

    const res = await fetch('http://localhost:8000/api/subir-imagen', {
      method: 'POST',
      // headers: {
      //   'Authorization': `Bearer ${token}`, // Si necesitas autenticación
      // },
      body: formData,
    });

    return await res.json();
  }
}
