import { NgModule } from '@angular/core';
import { ProfileCardComponent } from './profile-card.component';
import { CommonModule } from '@angular/common';
import { PhotoViewerModule } from '@acharyarajasekhar/ion-native-services';

@NgModule({
  declarations: [ProfileCardComponent],
  imports: [
    CommonModule,
    PhotoViewerModule 
  ],
  exports: [ProfileCardComponent]
})
export class ProfileCardModule { }
