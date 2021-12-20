import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Drug } from '@pdss/components/browser/components/drug/drug';
import { FormBuilder } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export interface DrugTreeNode {
  atcCode?: string; // code (short name)
  atcName?: string; //name
  atcId?: number; // id

  drugName?: string;
  drugId?: number;
  drugHasGuideline?: number;
  drugHasPharmgkbCa?: number;
  drugHasPharmgkbDruglabel?: number;
  drugHasPharmgkbGuideline?: number;
  drugHasPharmgkbVa?: number;
  drugHasRxAnnotation?: number;
  drugHasSpmedGuideline?: number;
  children?: DrugTreeNode[];
}

/** Flat node with expandable and level information */
interface DrugFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  data: DrugTreeNode;
}

@Component({
  selector: 'app-atc-drug-tree',
  templateUrl: './atc-drug-tree.component.html',
  styleUrls: ['./atc-drug-tree.component.scss'],
})
export class AtcDrugTreeComponent implements OnInit, OnDestroy {
  @Input() drugList$ = new BehaviorSubject<Drug[]>(null);
  drugListSearched$ = new BehaviorSubject<Drug[]>(null);

  subscription$ = new Subscription();
  expandedLevel = -2;

  searchTypeOptions = [
    {
      value: 0, // for all
      name: marker(
        'PDSS__UTILITY__ATC_CLASSIFICATION__SEARCH_TYPE_OPTIONS__ALL'
      ),
    },
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
    type: [0],
    keyword: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._subscribeDrugListChange();
    this._subscribeDrugListSearchedChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private _convertDrugListToDrugTreeNodeList(drugList: Drug[]): DrugTreeNode[] {
    if (!drugList || drugList.length === 0) {
      return [];
    }
    const nodeList: DrugTreeNode[] = [];
    const drugHasNoAtc: DrugTreeNode[] = [];
    const nodePushed = new Set();
    const drugSet = new Set();
    for (const drug of drugList) {
      const atcCodes = drug.atcCodes;
      drugSet.add(drug.id);
      // add root node
      if (!!atcCodes) {
        for (const atcCode of atcCodes) {
          const {
            codeLevel1,
            level1,
            codeLevel2,
            level2,
            codeLevel3,
            level3,
            codeLevel4,
            level4,
          } = atcCode;

          // level 1
          if (!nodePushed.has(codeLevel1)) {
            nodeList.push({
              atcCode: codeLevel1,
              atcName: level1,
              children: [],
            });
            nodePushed.add(codeLevel1);
          }
          const nodeLv1 = nodeList.find((node) => node.atcCode === codeLevel1);
          const nodeLv1Children = nodeLv1.children;

          // level 2
          if (!nodePushed.has(codeLevel2)) {
            nodeLv1Children.push({
              atcCode: codeLevel2,
              atcName: level2,
              children: [],
            });
            nodePushed.add(codeLevel2);
          }
          const nodeLv2 = nodeLv1Children.find(
            (node) => node.atcCode === codeLevel2
          );
          const nodeLv2Children = nodeLv2.children;

          // level 3
          if (!nodePushed.has(codeLevel3)) {
            nodeLv2Children.push({
              atcCode: codeLevel3,
              atcName: level3,
              children: [],
            });
            nodePushed.add(codeLevel3);
          }
          const nodeLv3 = nodeLv2Children.find(
            (node) => node.atcCode === codeLevel3
          );
          const nodeLv3Children = nodeLv3.children;

          // level 4
          if (!nodePushed.has(codeLevel4)) {
            nodeLv3Children.push({
              atcCode: codeLevel4,
              atcName: level4,
              children: [],
            });
            nodePushed.add(codeLevel4);
          }
          const nodeLv4 = nodeLv3Children.find(
            (node) => node.atcCode === codeLevel4
          );
          const nodeLv4Children = nodeLv4.children;
          const existedDrug = nodeLv4Children.find((d) => d.drugId === drug.id);
          if (!existedDrug) {
            nodeLv4Children.push({
              drugId: drug.id,
              drugName: drug.name,
              drugHasPharmgkbGuideline: drug.hasPharmgkbGuideline,
              drugHasPharmgkbDruglabel: drug.hasPharmgkbDruglabel,
              drugHasPharmgkbCa: drug.hasPharmgkbCa,
              drugHasPharmgkbVa: drug.hasPharmgkbVa,
              drugHasSpmedGuideline: drug.hasPharmgkbGuideline,
            });
          }
        }
      } else {
        drugHasNoAtc.push({
          drugId: drug.id,
          drugName: drug.name,
          drugHasPharmgkbGuideline: drug.hasPharmgkbGuideline,
          drugHasPharmgkbDruglabel: drug.hasPharmgkbDruglabel,
          drugHasPharmgkbCa: drug.hasPharmgkbCa,
          drugHasPharmgkbVa: drug.hasPharmgkbVa,
          drugHasSpmedGuideline: drug.hasPharmgkbGuideline,
        });
      }
    }

    if (drugHasNoAtc.length > 0) {
      nodeList.push({
        atcCode: 'No ATC Code',
        atcName: 'UnClassification',
        children: drugHasNoAtc,
      });
    }

    return nodeList;
  }

  private _subscribeDrugListChange(): void {
    const sub = this.drugList$.subscribe((drugList) => {
      if (drugList) {
        this._applySearch();
      }
    });
    this.subscription$.add(sub);
  }

  private _subscribeDrugListSearchedChange(): void {
    const sub = this.drugListSearched$.subscribe((drugList) => {
      this.dataSource.data = this._convertDrugListToDrugTreeNodeList(drugList);
      this._expandLevel(this.expandedLevel);
    });
    this.subscription$.add(sub);
  }

  private _transformer = (node: DrugTreeNode, level: number) => {
    return {
      expandable: node?.children?.length > 0,
      name: node.atcName || node.drugName,
      level: level,
      data: node,
    };
  };

  treeControl = new FlatTreeControl<DrugFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: DrugFlatNode) => node.expandable;

  private _expandLevel(level: number = this.expandedLevel): void {
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

  handleClickExpandLevel(level: number): void {
    this._expandLevel(level);
  }

  handleClickCollapseAll(): void {
    this.treeControl?.collapseAll();
  }

  private _applySearch(): void {
    const formValue = this.searchForm.value;
    let { type, keyword } = formValue;
    const drugList = this.drugList$.value;
    if (!keyword) {
      this.drugListSearched$.next(drugList);
    } else {
      keyword = keyword?.toLocaleLowerCase();
      const drugListSearched = drugList.filter((drug) => {
        const existedAtcCodeLevel = !!drug?.atcCodes?.find((atc) => {
          return (
            atc.codeLevel1.toLocaleLowerCase().includes(keyword) ||
            atc.codeLevel2.toLocaleLowerCase().includes(keyword) ||
            atc.codeLevel3.toLocaleLowerCase().includes(keyword) ||
            atc.codeLevel4.toLocaleLowerCase().includes(keyword)
          );
        });

        const existedAtcLevel = !!drug?.atcCodes?.find((atc) => {
          return (
            atc.level1?.toLocaleLowerCase().includes(keyword) ||
            atc.level2?.toLocaleLowerCase().includes(keyword) ||
            atc.level3?.toLocaleLowerCase().includes(keyword) ||
            atc.level4?.toLocaleLowerCase().includes(keyword)
          );
        });

        const existedDrugName = !!drug?.name?.includes(keyword);
        let result = false;

        switch (type) {
          case 0:
            // all
            result = existedAtcCodeLevel || existedAtcLevel || existedDrugName;
            break;
          case 1:
            // atc
            result = existedAtcCodeLevel || existedAtcLevel;
            break;
          case 2:
            // drug
            result = existedDrugName;
            break;
        }
        console.log(result);
        return result;
      });
      this.drugListSearched$.next(drugListSearched);
    }
  }

  get f(): any {
    return this.searchForm.controls;
  }

  private _expandBySearchType(): void {
    const type = this.searchForm?.value?.type;
    if (type === 0 || type === 2) {
      this._expandLevel(3);
    } else {
      this._expandLevel(2);
    }
  }
  handleOnClickSearch(): void {
    this._applySearch();
    this._expandBySearchType();
  }

  handleOnResetSearchForm(): void {
    this.searchForm.patchValue({
      keyword: '',
    });
    this._applySearch();
  }
}
