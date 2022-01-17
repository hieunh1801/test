import { Component, Input, OnInit } from '@angular/core';
import { Gene } from '../../services/product.service';

@Component({
  selector: 'app-gene-list',
  templateUrl: './gene-list.component.html',
  styleUrls: ['./gene-list.component.scss'],
})
export class GeneListComponent implements OnInit {
  @Input() geneList: Gene[];

  constructor() {}

  ngOnInit(): void {}
}
