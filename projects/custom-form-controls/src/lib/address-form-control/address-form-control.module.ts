import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormControlComponent } from './address-form-control.component';
import { HttpClientModule } from '@angular/common/http';
import { BusyIndicatorModule } from '@acharyarajasekhar/busy-indicator';
import { FormsModule } from '@angular/forms';
import { ElasticTextareaModule } from '@acharyarajasekhar/elastic-textarea';
import { GoogleMapsModule } from '@acharyarajasekhar/google-maps';

@NgModule({
  declarations: [
    AddressFormControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BusyIndicatorModule,
    ElasticTextareaModule,
    GoogleMapsModule
  ],
  exports: [
    AddressFormControlComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddressFormControlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AddressFormControlModule,
      providers: []
    };
  }
}
