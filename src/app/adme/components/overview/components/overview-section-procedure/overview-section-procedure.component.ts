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
      title: marker(
        'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__1__TITLE'
      ),
      contentList: [
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__1__CONTENT__1'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__1__CONTENT__2'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__1__CONTENT__3'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__1__CONTENT__4'
        ),
      ],
    },
    {
      title: marker(
        'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__2__TITLE'
      ),
      contentList: [
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__2__CONTENT__1'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__2__CONTENT__2'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__2__CONTENT__3'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__2__CONTENT__4'
        ),
      ],
    },
    {
      title: marker(
        'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__3__TITLE'
      ),
      contentList: [
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__3__CONTENT__1'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__3__CONTENT__2'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__3__CONTENT__3'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__3__CONTENT__4'
        ),
      ],
    },
    {
      title: marker(
        'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__4__TITLE'
      ),
      contentList: [
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__4__CONTENT__1'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__4__CONTENT__2'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__4__CONTENT__3'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__4__CONTENT__4'
        ),
      ],
    },
    {
      title: marker(
        'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__5__TITLE'
      ),
      contentList: [
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__5__CONTENT__1'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__5__CONTENT__2'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__5__CONTENT__3'
        ),
        marker(
          'ADME__OVERVIEW__SECTIONS_PROCEDURE__PROCEDURE_LIST__5__CONTENT__4'
        ),
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
