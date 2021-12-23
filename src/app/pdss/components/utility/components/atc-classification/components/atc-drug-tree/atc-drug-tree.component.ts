import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AtcCode } from '@pdss/components/browser/components/drug/atc-code';
import { Drug } from '@pdss/components/browser/components/drug/drug';
import { AtcDrugTreeDataSourceService } from '@pdss/components/utility/services/atc-drug-tree-data-source.service';
import {
  AtcDrugTreeService,
  DrugFlatNode,
  DrugTreeNode,
} from '@pdss/components/utility/services/atc-drug-tree.service';
import { PdssDrugService } from '@pdss/components/utility/services/pdss-drug.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-atc-drug-tree',
  templateUrl: './atc-drug-tree.component.html',
  styleUrls: ['./atc-drug-tree.component.scss'],
})
export class AtcDrugTreeComponent implements OnInit, OnDestroy {
  atcCodeList$ = new BehaviorSubject<AtcCode[]>(null);
  drugList$ = new BehaviorSubject<Drug[]>(null);

  subscription$ = new Subscription();

  expandedLevel = -2;

  modeOptions = [
    // {
    //   value: 0, // for all
    //   name: marker(
    //     'PDSS__UTILITY__ATC_CLASSIFICATION__SEARCH_TYPE_OPTIONS__ALL'
    //   ),
    // },
    {
      value: 1, // for atc class
      name: marker(
        'PDSS__UTILITY__ATC_CLASSIFICATION__SEARCH_TYPE_OPTIONS__ATC_CLASS'
      ),
    },
    {
      value: 2, // for drug name
      name: marker(
        'PDSS__UTILITY__ATC_CLASSIFICATION__SEARCH_TYPE_OPTIONS__DRUG'
      ),
    },
  ];

  searchForm = this.formBuilder.group({
    mode: [2],
    keyword: ['', [Validators.minLength(3)]],
  });

  flatNodeMap = new Map<DrugFlatNode, DrugTreeNode>();
  nestedNodeMap = new Map<DrugTreeNode, DrugFlatNode>();
  treeControl: FlatTreeControl<DrugFlatNode>;
  treeFlattener: MatTreeFlattener<DrugTreeNode, DrugFlatNode>;
  dataSource: MatTreeFlatDataSource<DrugTreeNode, DrugFlatNode>;
  expandedNodeSet = new Set<string>();
  loadingNodeSet = new Set<string>();
  constructor(
    private formBuilder: FormBuilder,
    private pdssDrugService: PdssDrugService,
    private atcDrugTreeDataSourceService: AtcDrugTreeDataSourceService
  ) {
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
  }

  ngOnInit(): void {
    this.subscribeDataSourceChange();
    // this.subscribeKeywordChange();
    this.atcDrugTreeDataSourceService.initTree();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  // private subscribeKeywordChange(): void {
  //   const sub = this.searchForm
  //     .get('keyword')
  //     .valueChanges.subscribe((value) => {
  //       if (!value) {
  //         this.atcDrugTreeDataSourceService.resetSearch();
  //       }
  //     });
  //   this.subscription$.add(sub);
  // }

  private subscribeDataSourceChange(): void {
    const sub = this.atcDrugTreeDataSourceService.dataChange.subscribe(
      (data) => {
        this.saveExpandedNode();
        this.dataSource.data = data;
        this.restoreExpandedNode();
      }
    );
    this.subscription$.add(sub);
  }

  private getLevel = (node: DrugFlatNode) => {
    return node.level;
  };

  private isExpandable = (node: DrugFlatNode) => {
    return node.expandable;
  };

  private getChildren = (node: DrugTreeNode): DrugTreeNode[] => {
    return node.children;
  };

  private _hasChild = (_: number, _nodeData: DrugFlatNode) => {
    return _nodeData.expandable;
  };

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

    this.expandedNodeSet = new Set(mExpandedNode);
  }

  private restoreExpandedNode(): void {
    this.treeControl.dataNodes.forEach((node) => {
      const id = `${node?.data?.atcId}#${node?.data?.atcCode}#${node?.data?.drugId}#${node?.data?.drugName}`;
      const result = this.expandedNodeSet.has(id);
      if (result) {
        this.treeControl.expand(node);
      }
    });
  }

  isAtcNode = (_: number, _nodeData: DrugFlatNode) => {
    return _nodeData?.level < 4;
  };

  handleClickCollapseAll(): void {
    this.treeControl.collapseAll();
  }

  handleClickExpandLevel(level: number): void {
    this.expandLevel(level);
  }

  expandDrugNode(flatNode: DrugFlatNode): void {
    const treeNode = this.flatNodeMap.get(flatNode);
    if (flatNode.level < 3) {
      return;
    }
    const isExpanded = this.treeControl.isExpanded(flatNode);
    if (isExpanded) {
      const id = `${flatNode?.data?.atcId}#${flatNode?.data?.atcCode}#${flatNode?.data?.drugId}#${flatNode?.data?.drugName}`;
      this.loadingNodeSet.add(id);
      this.atcDrugTreeDataSourceService.expandDrugChildren(treeNode, () => {
        this.loadingNodeSet.delete(id);
      });
    }
  }

  isLoadingNode(flatNode: DrugFlatNode): boolean {
    const id = `${flatNode?.data?.atcId}#${flatNode?.data?.atcCode}#${flatNode?.data?.drugId}#${flatNode?.data?.drugName}`;
    return this.loadingNodeSet.has(id);
  }
  get f(): any {
    return this.searchForm?.controls;
  }
  expandLevel(level: number = this.expandedLevel): void {
    if (this.treeControl.dataNodes) {
      for (const node of this.treeControl.dataNodes) {
        if (node?.level <= level) {
          this.treeControl.expand(node);
        } else {
          this.treeControl.collapse(node);
        }
      }
    }
  }

  handleOnClickSearch(): void {
    this.searchForm.markAllAsTouched();
    this.searchForm.markAsDirty();

    if (!this.searchForm.valid) {
      return;
    }
    const formValue = this.searchForm.value;
    const { keyword, mode } = formValue;
    this.atcDrugTreeDataSourceService.searchByKeyword(keyword, mode, () => {
      this.expandedLevel = -2;
      this.expandLevel(0);
      this.expandLevel(1);
      this.expandLevel(2);
      if (mode === 0 || mode === 2) {
        this.expandLevel(3);
      }
    });
  }

  handleOnResetSearchForm(): void {
    this.searchForm.patchValue({
      keyword: null,
    });
    this.treeControl.collapseAll();
    this.atcDrugTreeDataSourceService.resetSearch();
  }

  handleOnClickReload(): void {
    this.treeControl.collapseAll();
    this.atcDrugTreeDataSourceService.resetSearch();
  }
}
