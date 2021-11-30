import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  snsLinkList: SnsLink[] = [
    {
      title: 'facebook',
      link: 'https://www.facebook.com/SPMEDkr/',
      iconLink: '../../../../assets/common/facebook_icon.png',
    },

    {
      title: 'instagram',
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
  ];

  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {}
}

interface SnsLink {
  title: string;
  link: string;
  iconLink: string;
}
