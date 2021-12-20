import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { JoyrideModule } from 'ngx-joyride';
@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactRoutingModule, JoyrideModule],
})
export class ContactModule {}
