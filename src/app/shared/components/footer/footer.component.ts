import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  snsLinkList: SnsLink[] = [
    {
      title: 'Facebook',
      link: 'https://www.facebook.com/SPMEDkr/',
      iconLink: '../../../../assets/common/facebook_icon.png',
    },

    {
      title: 'Instagram',
      link: 'https://www.instagram.com/spmed_official/',
      iconLink: '../../../../assets/common/instagram_icon.png',
    },
    {
      title: 'Naver',
      link: 'https://blog.naver.com/spmed1602',
      iconLink: '../../../../assets/common/naver_icon.png',
    },
    {
      title: 'Kakao Talk',
      link: '#',
      iconLink: '../../../../assets/common/kakaotalk_icon.png',
    },
    {
      title: 'Youtube',
      link: 'https://www.youtube.com/channel/UCRU7t7pQzXCwOkBCAT_EoGw',
      iconLink: '../../../../assets/common/youtobe_icon.png',
    },
  ];

  footerInfo = {
    titles: {
      copyright: marker('LAYOUT__FOOTER__TITLES__COPYRIGHT'),
      services: marker('LAYOUT__FOOTER__TITLES__SERVICES'),
      links: marker('LAYOUT__FOOTER__TITLES__LINK'),
      contactUs: marker('LAYOUT__FOOTER__TITLES__CONTACT_US'),
      addresses: marker('LAYOUT__FOOTER__TITLES__ADDRESSES'),
    },
    serviceList: [
      {
        title: marker('LAYOUT__FOOTER__SERVICES__PDSS_MY_PRESCRIPTION'),
        routerLink: ['/pdss'],
      },
      {
        title: marker('LAYOUT__FOOTER__SERVICES__GENOTYPING_KIT'),
        routerLink: ['/genotyping-kit'],
      },
      {
        title: marker('LAYOUT__FOOTER__SERVICES__ADME'),
        routerLink: ['/adme'],
      },
      {
        title: marker('LAYOUT__FOOTER__SERVICES__HUMAN_RECOMBINANT_ENZYMES'),
        routerLink: ['/human-recombinant-enzymes'],
      },
    ],
    linkList: [],
    contactUsList: [],
    addressList: [
      {
        name: marker('LAYOUT__FOOTER__ADDRESS_LIST__HEAD_QUARTER'),
        address: marker('LAYOUT__FOOTER__ADDRESS_LIST__HEAD_QUARTER__ADDRESS'),
      },
      {
        name: marker('LAYOUT__FOOTER__ADDRESS_LIST__SEOUL_OFFICE'),
        address: marker('LAYOUT__FOOTER__ADDRESS_LIST__SEOUL_OFFICE__ADDRESS'),
      },
      {
        name: marker('LAYOUT__FOOTER__ADDRESS_LIST__SUWON_OFFICE'),
        address: marker('LAYOUT__FOOTER__ADDRESS_LIST__SUWON_OFFICE__ADDRESS'),
      },
    ],
  };
  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {}
}

interface SnsLink {
  title: string;
  link: string;
  iconLink: string;
}
