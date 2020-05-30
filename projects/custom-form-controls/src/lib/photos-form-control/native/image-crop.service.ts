import { Injectable } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { ToastService } from '@acharyarajasekhar/ngx-utility-services';

@Injectable({
    providedIn: 'root'
})
export class ImageCropService {

    constructor(
        private crop: Crop,
        private toast: ToastService
    ) { }

    public cropImage(imageSrc): Promise<string> {
        return new Promise((resolve) => {
            this.crop.crop(imageSrc, { quality: 50 }).then(newImage => resolve(newImage)).catch(error => {
                this.toast.error("Error while cropping: " + JSON.stringify(error));
                resolve(imageSrc);
            })
        })
    }
}