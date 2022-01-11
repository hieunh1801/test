import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-procedure',
  templateUrl: './overview-section-procedure.component.html',
  styleUrls: ['./overview-section-procedure.component.scss'],
})
export class OverviewSectionProcedureComponent implements OnInit {
  procedureList = [
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__PROCEDURE__PROCEDURE_LIST__1'
      ),
      imgUrl: '/assets/images/human_recombinant_enzyme_procedure_1.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__PROCEDURE__PROCEDURE_LIST__2'
      ),
      imgUrl: '/assets/images/human_recombinant_enzyme_procedure_2.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__PROCEDURE__PROCEDURE_LIST__3'
      ),
      imgUrl: '/assets/images/human_recombinant_enzyme_procedure_3.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__PROCEDURE__PROCEDURE_LIST__4'
      ),
      imgUrl: '/assets/images/human_recombinant_enzyme_procedure_4.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__PROCEDURE__PROCEDURE_LIST__5'
      ),
      imgUrl: '/assets/images/human_recombinant_enzyme_procedure_5.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__PROCEDURE__PROCEDURE_LIST__6'
      ),
      imgUrl: '/assets/images/human_recombinant_enzyme_procedure_6.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
