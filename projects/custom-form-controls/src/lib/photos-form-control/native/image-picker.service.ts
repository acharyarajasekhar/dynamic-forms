import { Injectable } from '@angular/core';
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';
import { BusyIndicatorService } from '@acharyarajasekhar/busy-indicator';
import { ToastService } from '@acharyarajasekhar/ngx-utility-services';
import { FileService } from './file.service';
import { ImageCropService } from './image-crop.service';
import * as _ from 'lodash';

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

            let images = [];
            const hasPermission = await this.imagePicker.hasReadPermission();
            if (!hasPermission) await this.imagePicker.requestReadPermission();

            try {

                const hasPermission = await this.imagePicker.hasReadPermission();

                if (!!hasPermission) {

                    this.options.maximumImagesCount = noOfImages;
                    const imageUrls = await this.imagePicker.getPictures(this.options);
                    console.log(imageUrls);
                    this.busy.show();

                    try {
                        if (!!imageUrls && imageUrls.length > 0) {

                            let images: string[] = [];
                            for (let i = 0; i < imageUrls.length; i++) {
                                let imageUrl = imageUrls[i];
                                if (!!imageUrl && (!!cropRequired || noOfImages === 1)) {
                                    imageUrl = await this.cropSvc.cropImage(imageUrl);
                                    if (!!imageUrl) imageUrl = imageUrl.split('?')[0]
                                }
                                let base64 = await this.fileSvc.readAsDataURL(imageUrl);
                                console.log(base64);
                                if (!!base64) images.push(base64);
                            }

                            this.busy.hide();
                            console.log(images);
                            return images;
                        }
                    }
                    catch (err) {
                        let e = { message: "Error while reading images: " + JSON.stringify(err) }
                        this.toast.error(e);
                    }
                }
            }
            catch (err) {
                let e = { message: "Error while selecting images: " + JSON.stringify(err) }
                this.toast.error(e);
            }
        }
        catch (err) {
            let e = { message: "Error while checking imagepicker permission: " + JSON.stringify(err) }
            this.toast.error(e);
        }

        this.busy.hide();
        console.log('empty files');
        return [];

    }
}