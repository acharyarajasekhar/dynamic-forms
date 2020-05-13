import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioListFormControlComponent } from './radio-list-form-control.component';
import { RadioListComponent } from './radio-list/radio-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RadioListFormControlComponent, RadioListComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  entryComponents: [RadioListComponent],
  exports: [RadioListFormControlComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RadioListFormControlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RadioListFormControlModule,
      providers: []
    };
  }
}
