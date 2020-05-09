import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticTextAreaDirective } from './elastic-textarea.directive';

@NgModule({
  declarations: [ElasticTextAreaDirective],
  imports: [
    CommonModule
  ],
  exports: [ElasticTextAreaDirective]
})
export class ElasticTextareaModule { }
