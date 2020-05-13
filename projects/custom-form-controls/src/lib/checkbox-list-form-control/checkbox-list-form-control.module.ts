import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxListFormControlComponent } from './checkbox-list-form-control.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';

@NgModule({
  declarations: [CheckboxListFormControlComponent, CheckboxListComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [CheckboxListComponent],
  exports: [CheckboxListFormControlComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckboxListFormControlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CheckboxListFormControlModule,
      providers: []
    };
  }
}
