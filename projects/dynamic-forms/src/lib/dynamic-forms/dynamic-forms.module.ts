import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { ControlsService } from './services/controls.service';
import { DynamicControlsService } from './services/dynamic-controls.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElasticTextareaModule } from '@acharyarajasekhar/elastic-textarea';
import { 
  RadioListFormControlModule, 
  CheckboxListFormControlModule, 
  AddressFormControlModule, 
  PhotosFormControlModule } from '@acharyarajasekhar/custom-form-controls';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddressFormControlModule,
    PhotosFormControlModule,
    RadioListFormControlModule,
    CheckboxListFormControlModule,
    ElasticTextareaModule
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
