import { Component, Input, OnInit } from '@angular/core';
import { DrugRecommendation } from 'src/app/pdss/services/pdss-report.service';

@Component({
  selector: 'app-row-expanded',
  templateUrl: './row-expanded.component.html',
  styleUrls: ['./row-expanded.component.scss'],
})
export class RowExpandedComponent implements OnInit {
  @Input() drug: DrugRecommendation = null;

  constructor() {}

  ngOnInit(): void {}
}
