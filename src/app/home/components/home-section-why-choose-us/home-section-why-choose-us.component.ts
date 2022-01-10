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
      imgUrl: 'https://image.flaticon.com/icons/png/512/1253/1253680.png',
    },
    {
      title: marker('HOME__SECTION_WHY_CHOOSE_US__SLOGANS__2'),
      imgUrl: 'https://image.flaticon.com/icons/png/512/1245/1245362.png',
    },
    {
      title: marker('HOME__SECTION_WHY_CHOOSE_US__SLOGANS__3'),
      imgUrl: 'https://image.flaticon.com/icons/png/512/1253/1253337.png',
    },
    {
      title: marker('HOME__SECTION_WHY_CHOOSE_US__SLOGANS__4'),
      imgUrl: 'https://image.flaticon.com/icons/png/512/1256/1256486.png',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
