import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-procedure',
  templateUrl: './overview-section-procedure.component.html',
  styleUrls: ['./overview-section-procedure.component.scss'],
})
export class OverviewSectionProcedureComponent implements OnInit {
  procedureList: Procedure[] = [
    {
      title: marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__PROCEDURES__1'),
      imgUrl: '/assets/images/genotyping-kit-procedure-1.png',
    },
    {
      title: marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__PROCEDURES__2'),
      imgUrl: '/assets/images/genotyping-kit-procedure-2.png',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

interface Procedure {
  title: string;
  imgUrl: string;
}
