import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-overview-section-who-need',
  templateUrl: './overview-section-who-need.component.html',
  styleUrls: ['./overview-section-who-need.component.scss'],
})
export class OverviewSectionWhoNeedComponent implements OnInit {
  reasonList = [
    {
      imgUrl:
        'https://image.freepik.com/free-vector/faceless-happy-woman-walking-with-dog-park_74855-7312.jpg',
      title: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__1__TITLE'),
      content: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__1__CONTENT'),
    },
    {
      imgUrl:
        'https://image.freepik.com/free-vector/faceless-happy-woman-walking-with-dog-park_74855-7312.jpg',
      title: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__2__TITLE'),
      content: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__2__CONTENT'),
    },
    {
      imgUrl:
        'https://image.freepik.com/free-vector/faceless-happy-woman-walking-with-dog-park_74855-7312.jpg',
      title: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__3__TITLE'),
      content: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__3__CONTENT'),
    },
    {
      imgUrl:
        'https://image.freepik.com/free-vector/faceless-happy-woman-walking-with-dog-park_74855-7312.jpg',
      title: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__4__TITLE'),
      content: marker('PDSS__OVERVIEW__WHO_NEED__REASON_LIST__4__CONTENT'),
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
