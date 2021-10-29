import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  certificateList = [
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
      title: 'manufacturing permit for in vitro medical devices_CYP2D6',
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

  constructor() {}

  ngOnInit(): void {}
}
