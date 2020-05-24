import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosFormControlComponent } from './photos-form-control.component';
import { FormsModule } from '@angular/forms';
import { BusyIndicatorModule } from '@acharyarajasekhar/busy-indicator';

@NgModule({
  declarations: [
    PhotosFormControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BusyIndicatorModule
  ],
  exports: [
    PhotosFormControlComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhotosFormControlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PhotosFormControlModule,
      providers: []
    };
  }
}
