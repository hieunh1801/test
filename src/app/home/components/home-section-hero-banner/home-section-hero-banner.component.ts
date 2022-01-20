import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-section-hero-banner',
  templateUrl: './home-section-hero-banner.component.html',
  styleUrls: ['./home-section-hero-banner.component.scss'],
})
export class HomeSectionHeroBannerComponent implements OnInit {
  @Output() onClickOurServices = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleOnClickOurServices(): void {
    console.log('emit');
    this.onClickOurServices.emit();
  }
}
