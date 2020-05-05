import { NgModule, ModuleWithProviders, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { IonicModule } from 'ionic-angular';
import { AddressControlComponent } from './components/address-control/address-control.component';
import { PostalAddressApiService } from './services/postal-address-api.service';
import { HttpClientModule } from '@angular/common/http';
import { BusyIndicatorModule } from '@acharyarajasekhar/busy-indicator';
// import { CacheModule } from 'ionic-cache';
import { PhotosControlComponent } from './components/photos-control/photos-control.component';
import { IMAGE_PICKER_SERVICE, IImagePickerService, ImagePickerService } from './services/native-image-picker.service';
import { MultiSelectControlComponent } from './components/multi-select-control/multi-select-control.component';
import { DatePickerControlComponent } from './components/date-picker-control/date-picker-control.component';
import { BaseControlComponent } from './components/base-control.component';
import { TempleTimingsControlComponent } from './components/temple-timings-control/temple-timings-control.component';
import { EditTempleTimingsComponent } from './components/edit-temple-timings/edit-temple-timings.component';
import { CheckboxControlComponent } from './components/checkbox-control/checkbox-control.component';
import { DateRangePickerControlComponent } from './components/date-range-picker-control/date-range-picker-control.component';
import { SelectControlComponent } from './components/select-control/select-control.component';

export interface CustomFormControlsModuleConfig {
  imagePickerService: Type<IImagePickerService>;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BusyIndicatorModule
  ],
  declarations: [
    AddressControlComponent,
    PhotosControlComponent,
    SelectControlComponent,
    MultiSelectControlComponent,
    DatePickerControlComponent,
    BaseControlComponent,
    TempleTimingsControlComponent,
    EditTempleTimingsComponent,
    CheckboxControlComponent,
    DateRangePickerControlComponent
  ],
  entryComponents: [EditTempleTimingsComponent],
  exports: [
    AddressControlComponent,
    PhotosControlComponent,
    SelectControlComponent,
    MultiSelectControlComponent,
    DatePickerControlComponent,
    BaseControlComponent,
    TempleTimingsControlComponent,
    CheckboxControlComponent,
    DateRangePickerControlComponent
  ],
  providers: [
    PostalAddressApiService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomFormControlsModule {
  static forRoot(config?: CustomFormControlsModuleConfig): ModuleWithProviders {
    return {
      ngModule: CustomFormControlsModule,
      providers: [
        PostalAddressApiService,
        { provide: IMAGE_PICKER_SERVICE, useClass: config && config.imagePickerService || ImagePickerService }
      ]
    };
  }
}
