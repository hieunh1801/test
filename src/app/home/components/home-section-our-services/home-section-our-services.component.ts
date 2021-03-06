import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-home-section-our-services',
  templateUrl: './home-section-our-services.component.html',
  styleUrls: ['./home-section-our-services.component.scss'],
})
export class HomeSectionOurServicesComponent implements OnInit {
  servicesList: Service[] = [
    {
      title: marker('HOME__SECTION_OUR_SERVICE__SERVICES__1__TITLE'),
      imageUrl: '/assets/images/home-pdss-intro.jpg',
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
          routerLink: ['/pdss'],
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__1__ROUTE_ACTION__2'
          ),
          routerLink: ['/pdss', 'my-report'],
        },
      ],
    },
    {
      title: marker('HOME__SECTION_OUR_SERVICE__SERVICES__2__TITLE'),
      imageUrl: '/assets/images/home-genotyping-kit-intro.png',
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
          routerLink: ['/genotyping-kit'],
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__2__ROUTE_ACTION__2'
          ),
          routerLink: [''],
        },
      ],
    },
    {
      title: marker('HOME__SECTION_OUR_SERVICE__SERVICES__3__TITLE'),
      // imageUrl:
      //   'https://image.freepik.com/free-vector/two-business-partners-handshaking_74855-6685.jpg',
      imageUrl: '/assets/images/adme-intro.jpg',
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
          routerLink: ['/adme'],
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__3__ROUTE_ACTION__2'
          ),
          routerLink: [''],
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
          routerLink: ['/human-recombinant-enzymes'],
        },
        {
          title: marker(
            'HOME__SECTION_OUR_SERVICE__SERVICES__4__ROUTE_ACTION__2'
          ),
          routerLink: [''],
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

interface Service {
  title: string;
  imageUrl: string;
  contents: string[];
  routeActions: {
    title: string;
    routerLink: string[];
  }[];
}
