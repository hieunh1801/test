import { Component, Input, OnInit } from '@angular/core';
import { Drug } from '../../services/product.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss'],
})
export class DrugListComponent implements OnInit {
  @Input() drugList: Drug[];

  constructor() {}

  ngOnInit(): void {}
}
