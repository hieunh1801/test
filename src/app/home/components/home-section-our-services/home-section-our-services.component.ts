import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-home-section-our-services',
  templateUrl: './home-section-our-services.component.html',
  styleUrls: ['./home-section-our-services.component.scss'],
})
export class HomeSectionOurServicesComponent implements OnInit {
  servicesList = [
    {
      title: marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__TITLE'),
      imageUrl:
        'https://image.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899173.jpg',
      contents: [
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__CONTENTS__1'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__CONTENTS__2'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__CONTENTS__3'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__CONTENTS__4'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__CONTENTS__5'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__CONTENTS__6'),
      ],
      routeActions: [
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__1__ROUTE_ACTION__1'
          ),
          routeLink: '',
          callback: () => {},
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__1__ROUTE_ACTION__2'
          ),
          routeLink: '',
          callback: () => {},
        },
      ],
    },
    {
      title: marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__TITLE'),
      imageUrl:
        'https://image.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899174.jpg',
      contents: [
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__CONTENTS__1'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__CONTENTS__2'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__CONTENTS__3'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__CONTENTS__4'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__CONTENTS__5'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__CONTENTS__6'),
      ],
      routeActions: [
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__2__ROUTE_ACTION__1'
          ),
          routeLink: '',
          callback: () => {},
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__2__ROUTE_ACTION__2'
          ),
          routeLink: '',
          callback: () => {},
        },
      ],
    },
    {
      title: marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__TITLE'),
      imageUrl:
        'https://image.freepik.com/free-vector/two-business-partners-handshaking_74855-6685.jpg',
      contents: [
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__CONTENTS__1'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__CONTENTS__2'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__CONTENTS__3'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__CONTENTS__4'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__CONTENTS__5'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__CONTENTS__6'),
      ],
      routeActions: [
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__3__ROUTE_ACTION__1'
          ),
          routeLink: '',
          callback: () => {},
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__3__ROUTE_ACTION__2'
          ),
          routeLink: '',
          callback: () => {},
        },
      ],
    },
    {
      title: marker('HOME__SECTION_OUR_SERVICE__SERVICES__4__TITLE'),
      imageUrl:
        'https://image.freepik.com/free-vector/illustration-healthy-lifestyle_53876-28533.jpg',
      contents: [
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__4__CONTENTS__1'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__4__CONTENTS__2'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__4__CONTENTS__3'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__4__CONTENTS__4'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__4__CONTENTS__5'),
        marker('HOME__SECTION_OUR_SERVICE__SERVICES__4__CONTENTS__6'),
      ],
      routeActions: [
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__4__ROUTE_ACTION__1'
          ),
          routeLink: '',
          callback: () => {},
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__4__ROUTE_ACTION__2'
          ),
          routeLink: '',
          callback: () => {},
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
