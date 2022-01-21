import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-home-section-why-choose-us',
  templateUrl: './home-section-why-choose-us.component.html',
  styleUrls: ['./home-section-why-choose-us.component.scss'],
})
export class HomeSectionWhyChooseUsComponent implements OnInit {
  reasonList = [
    {
      title: marker('HOME__SECTION_WHY_CHOOSE_US__SLOGANS__1'),
      imgUrl: '/assets/images/choose-us-01.png',
    },
    {
      title: marker('HOME__SECTION_WHY_CHOOSE_US__SLOGANS__2'),
      imgUrl: '/assets/images/choose-us-02.png',
    },
    {
      title: marker('HOME__SECTION_WHY_CHOOSE_US__SLOGANS__3'),
      imgUrl: '/assets/images/choose-us-03.png',
    },
    {
      title: marker('HOME__SECTION_WHY_CHOOSE_US__SLOGANS__4'),
      imgUrl: '/assets/images/choose-us-04.png',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
