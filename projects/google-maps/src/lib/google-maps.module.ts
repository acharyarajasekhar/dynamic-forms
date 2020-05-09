import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsComponent } from './google-maps.component';
import { GoogleMapsDirective } from './google-maps.directive';

@NgModule({
  declarations: [GoogleMapsComponent, GoogleMapsDirective],
  imports: [
    CommonModule,
  ],
  entryComponents: [GoogleMapsComponent],
  exports: [GoogleMapsComponent, GoogleMapsDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoogleMapsModule { }
