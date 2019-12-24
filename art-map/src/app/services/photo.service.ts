import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private url = "/api/photo/";

  //example: string = '/assets/data/example.geojson'; // Из файла

  constructor(private http: HttpClient) {
  };

  getMainPhoto(objectId: string): Observable<Blob> {
    return this.http.get(this.url + objectId + '/main', { responseType: 'blob' });
  }

  getPhotos(objectId: string): Observable<Blob> {
    return this.http.get(this.url + objectId, { responseType: 'blob' });
  }

  imageToShow: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    //this.isImageLoading = true;
    this.getMainPhoto("yourImageUrl").subscribe(data => {
      this.createImageFromBlob(data);
      //this.isImageLoading = false;
    }, error => {
      //this.isImageLoading = false;
      console.log(error);
    });
  }
}
