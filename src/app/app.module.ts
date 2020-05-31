import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@acharyarajasekhar/google-maps';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { DynamicFormsModule } from '@acharyarajasekhar/dynamic-forms';
import { SampleProfileComponent } from './sample-profile/sample-profile.component';
import { ProfileCardModule } from 'projects/profile-card/src/public-api';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';

@NgModule({
  declarations: [
    AppComponent,
    SampleFormComponent,
    SampleProfileComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormsModule,
    GoogleMapsModule,
    ProfileCardModule,
    IonicModule.forRoot()
  ],
  entryComponents: [SampleFormComponent,SampleProfileComponent],
  providers: [
    File,
    ImagePicker,
    Crop
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
