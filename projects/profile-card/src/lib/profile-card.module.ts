import { NgModule } from '@angular/core';
import { ProfileCardComponent } from './profile-card.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ProfileCardComponent],
  imports: [
    CommonModule
  ],
  exports: [ProfileCardComponent]
})
export class ProfileCardModule { }
