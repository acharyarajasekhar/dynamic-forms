import { InjectionToken, Injectable } from "@angular/core";

export interface IImagePickerService {
    pick(noofImages?: number): Promise<any>;
}

export const IMAGE_PICKER_SERVICE = new InjectionToken<IImagePickerService>('IMAGE_PICKER_SERVICE');

@Injectable({
    providedIn: 'root'
})
export class ImagePickerService implements IImagePickerService {
    pick(noofImages?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (noofImages && noofImages > 0) {
                console.log("In Service...");
                resolve([]);
            } else reject("No of images should be greater than zero...");
        });
    }
}