import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  historyEn = [
    {
      year: 2021,
      monthList: [
        {
          month: '09',
          achieveList: [
            'Trademark registration (SPMED PGx, PGxSPMED, PDSS)',
            'Acquired the certificate of start-up business from the Ministry of SMEs and Startups',
          ],
        },
        {
          month: '07',
          achieveList: [
            'Awarded Series A investment (Korea Investment Partners Co., Ltd, IMM Investment, Time Folio)',
            'Establishment of Seoul office',
          ],
        },
        {
          month: '04',
          achieveList: [
            'Medical device quality management system ISO13485:2016 certification',
          ],
        },
        {
          month: '03',
          achieveList: [
            'Patent Registration of Multiplex drug gene analysis kit for predicting drug side effects on chronic diseases and cancer related multi-prescription drugs and personalized drug treatmen',
            'Patent Registration of My Prescription Service Terminal, System and Method',
          ],
        },
        {
          month: '01',
          achieveList: [
            'Acquisition of “A” rank quality evaluation for genetic testing institutions',
          ],
        },
      ],
    },
    {
      year: 2020,
      monthList: [
        {
          month: '11',
          achieveList: [
            'SPMED™ Genotyping Kit: CYP2D6 Genotyping Kit CE-IVDD Certification',
          ],
        },
        {
          month: '07',
          achieveList: [
            'Signing a business agreement with Illumina for joint research and mutual cooperation',
            'Patent Registration of METHOD FOR QUICK-DETECTING HLA ALLELES ASSOCIATED WITH ADVERSE DRUG REACTION USING tSNP',
          ],
        },
        {
          month: '06',
          achieveList: [
            'The Korea Health Industry Promotion Agency (KIHIC) Selection of 2020 Startup and Leap Package Support Project',
          ],
        },
        {
          month: '05',
          achieveList: [
            "Selected as Busan Metropolitan City's leading start-up company (Platinum) in 2020",
          ],
        },
        {
          month: '04',
          achieveList: [
            'SPMED™ Genotyping Kit:CYP2D6 Genotyping Test Kit Permission for Medical Device Manufacturing(Permit No:No.20-297)',
            'Patent registration of high speed detection kit for human cytochrome P450 2D6 mutant gene',
          ],
        },
        {
          month: '03',
          achieveList: [
            'Awarded Pre-A investment (Korea Investment Partners Co., Ltd)',
            'Alliance of Pharmacogenomic Service Marketing Business',
          ],
        },
        {
          month: '02',
          achieveList: [
            'SPMED PGx Solution (Genotyping Kit Software) Development Completed',
          ],
        },
        {
          month: '01',
          achieveList: [
            'Inauguration of Jae-Gook Shin as CEO',
            'Patent Registration of UDP-GLUCURONOSYLTRANSFERASE SINGLE NUCLEOTIDE POLYMORPHISM MARKERS AND USE THEREOF',
            'Signed contract to supply recombinant human metabolizing enzyme in China',
          ],
        },
      ],
    },
  ];

  historyKr = [
    {
      year: '2021',
      monthList: [
        {
          month: '09',
          achieveList: [
            '상표 등록(SPMED PGx, PGxSPMED, PDSS)',
            '중소벤처기업부 창업기업확인서 취득',
          ],
        },
        {
          month: '07',
          achieveList: [
            '서울사무소 개소',
            'Series A 투자 유치 (한국투자파트너스, IMM인베스트먼트, 타임폴리오)',
          ],
        },
        {
          month: '04',
          achieveList: ['의료기기 품질경영시스템 ISO13485:2016 인증'],
        },
        {
          month: '03',
          achieveList: [
            '암 및 만성질환 관련 다처방 약물에 대한 약물 부작용 예측 및 개인맞춤 약물치료를 위한 다중고속 약물유전자 진단용 키트 특허 등록',
            '나의 처방전 서비스 단말기, 시스템 및 방법 특허 등록',
          ],
        },
        {
          month: '01',
          achieveList: ['유전자검사기관 질평가 A 획득'],
        },
      ],
    },
  ];
  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {}
}
