import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@acharyarajasekhar/google-maps';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { DynamicFormsModule } from 'projects/dynamic-forms/src/public-api';
import { SampleProfileComponent } from './sample-profile/sample-profile.component';
import { ProfileCardModule } from 'projects/profile-card/src/public-api';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
