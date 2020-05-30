import { Injectable } from '@angular/core';
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';
import { BusyIndicatorService } from '@acharyarajasekhar/busy-indicator';
import { ToastService } from '@acharyarajasekhar/ngx-utility-services';
import { FileService } from './file.service';
import { ImageCropService } from './image-crop.service';

@Injectable({
    providedIn: 'root'
})
export class ImagePickerService {

    private options: ImagePickerOptions = {
        maximumImagesCount: 1,
        quality: 60,
        outputType: OutputType.FILE_URL
    }

    constructor(
        private fileSvc: FileService,
        private busy: BusyIndicatorService,
        private imagePicker: ImagePicker,
        private cropSvc: ImageCropService,
        private toast: ToastService
    ) { }

    public async pick(noOfImages: number = 1, cropRequired: boolean = false): Promise<string[]> {

        try {
            let permissionResult = await this.imagePicker.hasReadPermission();
            if (!permissionResult) {
                await this.imagePicker.requestReadPermission();
            }

            this.options.maximumImagesCount = noOfImages;

            let imageUrls: string[] = await this.imagePicker.getPictures(this.options);
            if (!!imageUrls && imageUrls.length > 0) {
                let images: string[] = [];
                for (let i = 0; i < imageUrls.length; i++) {
                    let imageUrl = imageUrls[i];
                    if (!!imageUrl && (!!cropRequired || noOfImages === 1)) {
                        imageUrl = await this.cropSvc.cropImage(imageUrl);
                        if (!!imageUrl) imageUrl = imageUrl.split('?')[0]
                    }
                    let base64 = await this.fileSvc.readAsDataURL(imageUrl);
                    if (!!base64) images.push(base64);
                }
                return images;
            }
        }
        catch (err) {
            let e = { message: "Error in image picker: " + JSON.stringify(err) }
            this.toast.error(e);
            this.busy.hide();
            return [];
        }
        
    }
}