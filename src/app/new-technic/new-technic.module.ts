import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTechnicPageRoutingModule } from './new-technic-routing.module';

import { NewTechnicPage } from './new-technic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTechnicPageRoutingModule
  ],
  declarations: [NewTechnicPage]
})
export class NewTechnicPageModule {}
