import { Injectable } from '@angular/core';
import { BusyIndicatorService } from '@acharyarajasekhar/busy-indicator';
import * as _ from 'lodash';
import { ImagePickerService } from './native/image-picker.service';

@Injectable({
    providedIn: 'root'
})
export class PhotosFormControlService {

    constructor(
        private busy: BusyIndicatorService,
        private imagePickerService: ImagePickerService
    ) { }

    async selectPhoto(noOfImages: number = 1, cropRequired: boolean = false): Promise<any> {

        return this.imagePickerService.pick(noOfImages, cropRequired);

    }

    handleImageSelection(event) {

        return new Promise(res => {
            let promises = [];
            let selectedFiles = [];

            this.busy.show();

            _.forEach(event.target.files, (file) => {

                let promise = new Promise((res) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = event => {
                        selectedFiles.push(reader.result);
                        res();
                    };
                })

                promises.push(promise);

            })

            Promise.all(promises).then(() => {
                this.busy.hide();
                res(selectedFiles);
            });

        });

    }

}