import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@acharyarajasekhar/google-maps';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { DynamicFormsModule } from 'projects/dynamic-forms/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    SampleFormComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormsModule,
    GoogleMapsModule,
    IonicModule.forRoot()
  ],
  entryComponents: [SampleFormComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
