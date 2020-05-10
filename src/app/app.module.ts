import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicFormsModule } from 'projects/dynamic-forms/src/public-api';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from 'projects/google-maps/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormsModule,
    GoogleMapsModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
