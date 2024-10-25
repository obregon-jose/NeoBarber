import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { TokenService } from 'src/app/auth/services/get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _alert_loading_Service: AlertToastService,
    private _tokenService: TokenService,
  ) { }

  async uploadImage2(base64Data: string, id: number): Promise<void> {
    const token = await this._tokenService.getToken();
    const formData = new FormData();

    formData.append('image', base64Data); 
    const options = {
      url: `${this.apiUrl}/user-details/image/${id}`, // Ajusta el endpoint a tu URL de API
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.put(options);
      if (response.status === 201) {
        console.log('Exitoso:', response);
        this._alert_loading_Service.alertToastGreen('Imagen subida exitosamente');
        await loading.dismiss();
      } else {
        console.log('Fallido:', response);
        this._alert_loading_Service.alertToastYellow('Hubo un problema al subir la imagen');
        await loading.dismiss();
      }
    } catch (error) {
      console.log('Error en la conexión');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
    }
  }

async uploadImage(base64Data: string, id: number): Promise<string> {
    const token = await this._tokenService.getToken();

    // Convertir la cadena base64 en un Blob con el tipo de imagen
    const byteString = atob(base64Data);
    const mimeType = "image/png"; // Cambia según el formato de imagen que estés utilizando
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([intArray], { type: mimeType });

    // Preparar el FormData con el Blob correctamente
    const formData = new FormData();
    formData.append('image', blob, `image-${id}.png`); // Especifica el nombre del archivo

    const options = {
      url: `${this.apiUrl}/user-details/image/${id}`, // Endpoint correcto
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.put(options);
      if (response.status === 201) {
        const imageUrl = response.data.url;
        console.log('Exitoso:', imageUrl);
        this._alert_loading_Service.alertToastGreen('Imagen subida exitosamente');
        await loading.dismiss();
        return imageUrl;
      } else {
        console.log('Fallido:', response);
        this._alert_loading_Service.alertToastYellow('Hubo un problema al subir la imagen');
        await loading.dismiss();
        return '';
      }
    } catch (error) {
      console.log('Error en la conexión', error);
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
      return '';
    }
}

async uploadImage3(base64Data: string, id: number): Promise<string> {
  const token = await this._tokenService.getToken();

  // Convertir base64 a bytes para crear el Blob
  const byteString = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([intArray], { type: 'image/png' });

  // Configuración de FormData para enviar el archivo en bytes
  const formData = new FormData();
  formData.append('image', blob, `image-${id}.png`);

  const options = {
      url: `${this.apiUrl}/user-details/image/${id}`,
      data: formData,
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  };

  const loading = await this._alert_loading_Service.presentLoading();
  try {
      const response: HttpResponse = await CapacitorHttp.put(options);
      if (response.status === 201) {
          const imageUrl = response.data.url;
          console.log('Imagen subida con éxito:', imageUrl);
          this._alert_loading_Service.alertToastGreen('Imagen subida exitosamente');
          await loading.dismiss();
          return imageUrl;
      } else {
          console.log('Error al subir la imagen:', response);
          this._alert_loading_Service.alertToastYellow('Hubo un problema al subir la imagen');
          await loading.dismiss();
          return '';
      }
  } catch (error) {
      console.log('Error en la conexión', error);
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
      return '';
  }
}


  // async takePicture() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri,
  //   });

  //   return image.webPath;
  // }

  // async uploadImage(imageUrl: string) {
  //   const response = await fetch(imageUrl);
  //   const blob = await response.blob();

  //   const formData = new FormData();
  //   formData.append('image', blob, 'filename.jpg');

  //   const res = await fetch('http://localhost:8000/api/subir-imagen', {
  //     method: 'POST',
  //     // headers: {
  //     //   'Authorization': `Bearer ${token}`, // Si necesitas autenticación
  //     // },
  //     body: formData,
  //   });

  //   return await res.json();
  // }
}
