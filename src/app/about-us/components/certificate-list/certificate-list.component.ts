import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements OnInit {
  certificateList: Certificate[] = [
    {
      title:
        'Medical device quality management system ISO13485:2016 certification',
      url: 'https://spmed.kr/data/bbsData/16230513569.jpg',
    },
    {
      title: 'SPMED™ Genotyping Kit:CYP2D6 Kit CE-IVDD Certificate',
      url: 'https://spmed.kr/data/bbsData/16230517819.jpg',
    },
    {
      title: 'Busan Platinum Club Certificate',
      url: 'https://spmed.kr/data/bbsData/15954046799.jpg',
    },
    {
      title: 'Manufacturing of in vitro diagnostic equipment License',
      url: 'https://spmed.kr/data/bbsData/15954046379.jpg',
    },
    {
      title: 'Manufacturing permit for in vitro medical devices_CYP2D6',
      url: 'https://spmed.kr/data/bbsData/15959158849.jpg',
    },
    {
      title: 'Certificate of Quality Evaluation of Genetic Testing Agencies',
      url: 'https://spmed.kr/data/bbsData/15954042469.jpg',
    },
    {
      title: 'Confirmation of Venture Business',
      url: 'https://spmed.kr/data/bbsData/15954041259.jpg',
    },
    {
      title: 'Accreditation for Corporate Affiliated Research Institute',
      url: 'https://spmed.kr/data/bbsData/15954040629.jpg',
    },
    {
      title: 'GMP Accreditation',
      url: 'https://spmed.kr/data/bbsData/16284772739.jpg',
    },
    {
      title: 'Genetic Testing Agency Identification Card',
      url: 'https://spmed.kr/data/bbsData/15954039039.jpg',
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
