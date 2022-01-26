import { animate, style, transition, trigger } from '@angular/animations';
import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
  animations: [
    trigger('overlayOpenClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('00ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CertificateListComponent implements OnInit {
  certificateList: Certificate[] = [
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_1__MEDICAL'),
      url: '/assets/images/certificates/certificate_1.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_2__GENOTYPING'),
      url: '/assets/images/certificates/certificate_2.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_3__BUSAN'),
      url: '/assets/images/certificates/certificate_3.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_4__MANUFACTURING'),
      url: '/assets/images/certificates/certificate_4.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_5__MANUFACTURING'),
      url: '/assets/images/certificates/certificate_5.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_6__EVALUATION'),
      url: '/assets/images/certificates/certificate_6.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_7__CONFIRMATION'),
      url: '/assets/images/certificates/certificate_7.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_8__ACCREDITATION'),
      url: '/assets/images/certificates/certificate_8.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_9__GMP'),
      url: '/assets/images/certificates/certificate_9.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_10__GENETIC'),
      url: '/assets/images/certificates/certificate_10.png',
    },
    {
      title: marker('ABOUT_US__CERTIFICATE_LIST__CERTIFICATE_11__LEADING'),
      url: '/assets/images/certificates/busan-leading-company.png',
    },
  ];

  isShowImageOverlay = false;

  selectedCertificate?: Certificate;

  constructor(public overlay: Overlay) {}

  ngOnInit(): void {}

  openOverlayImage(certificate: Certificate): void {
    this.selectedCertificate = certificate;
    this.isShowImageOverlay = true;
  }

  closeOverlayImage(): void {
    this.isShowImageOverlay = false;
  }
}

interface Certificate {
  title: string;
  url: string;
}
