import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { ControlsService } from './services/controls.service';
import { DynamicControlsService } from './services/dynamic-controls.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressFormControlModule } from 'projects/custom-form-controls/src/public-api';
import { PhotosFormControlModule } from 'projects/custom-form-controls/src/lib/photos-form-control/photos-form-control.module';
// import { CustomFormControlsModule } from '../custom-form-controls/custom-form-controls.module';
// import { ElasticTextAreaModule } from '../../elastic-textarea/elastic-textarea.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddressFormControlModule,
    PhotosFormControlModule
    // ElasticTextAreaModule
  ],
  declarations: [
    DynamicFormComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [
    ControlsService,
    DynamicControlsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DynamicFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [ControlsService, DynamicControlsService]
    };
  }
}
