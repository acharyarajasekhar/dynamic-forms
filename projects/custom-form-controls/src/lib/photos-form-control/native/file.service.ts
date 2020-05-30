import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private file: File) { }

    public async readAsDataURL(fileURL: string): Promise<string> {
        if (!!fileURL) {
            var copyPath = fileURL;
            var splitPath = copyPath.split('/');
            var fileName = splitPath[splitPath.length - 1];
            var filePath = fileURL.split(fileName)[0];
            return await this.file.readAsDataURL(filePath, fileName);
        }
        return null;
    }

}