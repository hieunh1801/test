import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Subscription } from 'rxjs';
import {
  AtcDrugTreeDataSourceService,
  DrugFlatNode,
  DrugTreeNode,
} from '../../services/atc-drug-tree-data-source.service';

@Component({
  selector: 'app-atc-classification-v3',
  templateUrl: './atc-classification-v3.component.html',
  styleUrls: ['./atc-classification-v3.component.scss'],
})
export class AtcClassificationV3Component implements OnInit, OnDestroy {
  flatNodeMap = new Map<DrugFlatNode, DrugTreeNode>();
  nestedNodeMap = new Map<DrugTreeNode, DrugFlatNode>();
  treeControl: FlatTreeControl<DrugFlatNode>;
  treeFlattener: MatTreeFlattener<DrugTreeNode, DrugFlatNode>;
  dataSource: MatTreeFlatDataSource<DrugTreeNode, DrugFlatNode>;

  expandedNode = new Set<string>();

  subscription$ = new Subscription();

  constructor(
    private atcDrugTreeDataSourceService: AtcDrugTreeDataSourceService
  ) {}

  ngOnInit(): void {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<DrugFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.subscribeDataSourceChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private subscribeDataSourceChange(): void {
    const sub = this.atcDrugTreeDataSourceService.dataChange.subscribe(
      (data) => {
        this.saveExpandedNode();
        console.log('expanded node', this.expandedNode);
        this.dataSource.data = data;
        this.restoreExpandedNode();
      }
    );
    this.subscription$.add(sub);
  }

  private saveExpandedNode(): void {
    const mExpandedNode =
      this.treeControl?.dataNodes
        ?.filter((node) => {
          return this.treeControl.isExpanded(node);
        })
        .map(
          (node) =>
            `${node?.data?.atcId}#${node?.data?.atcCode}#${node?.data?.drugId}#${node?.data?.drugName}`
        ) || [];

    this.expandedNode = new Set(mExpandedNode);
  }

  private restoreExpandedNode(): void {
    this.treeControl.dataNodes.forEach((node) => {
      const pattern = `${node?.data?.atcId}#${node?.data?.atcCode}#${node?.data?.drugId}#${node?.data?.drugName}`;
      const result = this.expandedNode.has(pattern);
      if (result) {
        this.treeControl.expand(node);
      }
    });
  }

  private getLevel = (node: DrugFlatNode) => node.level;

  private isExpandable = (node: DrugFlatNode) => node.expandable;

  private getChildren = (node: DrugTreeNode): DrugTreeNode[] => node.children;

  hasChild = (_: number, _nodeData: DrugFlatNode) => _nodeData.expandable;

  private transformer = (node: DrugTreeNode, level: number) => {
    const flatNode: DrugFlatNode = {
      expandable: !!node.atcName,
      name: node.atcName || node.drugName,
      level: level,
      data: node,
      isLoading: false,
    };
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };
}
