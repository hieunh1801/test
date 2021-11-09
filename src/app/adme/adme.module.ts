import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmeRoutingModule } from './adme-routing.module';
import { AdmeComponent } from './adme.component';

@NgModule({
  declarations: [AdmeComponent],
  imports: [CommonModule, AdmeRoutingModule],
})
export class AdmeModule {}
