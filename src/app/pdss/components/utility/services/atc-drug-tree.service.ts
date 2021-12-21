import { Injectable } from '@angular/core';
import { AtcCode } from '@pdss/components/browser/components/drug/atc-code';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdssAtcCodeService } from './pdss-atc-code.service';
import { AtcDrugSearchRequest, PdssDrugService } from './pdss-drug.service';

@Injectable({
  providedIn: 'root',
})
export class AtcDrugTreeService {
  dataChange = new BehaviorSubject<DrugTreeNode[]>([]);
  atcCodeList: AtcCode[] = [];

  get data(): DrugTreeNode[] {
    return this.dataChange.value;
  }

  constructor(
    private drugService: PdssDrugService,
    private atcCodeService: PdssAtcCodeService
  ) {
    this.initTree();
  }

  initTree(): void {
    this._getAtcCode().subscribe((nodeList) => {
      const atcCodeList = nodeList;
      const treeData = this.buildTree(atcCodeList);

      setInterval(() => {
        console.log('reload tree data');
        this.dataChange.next(treeData);
      }, 5000);
    });
  }

  buildTree(atcCodeList: AtcCode[]): DrugTreeNode[] {
    if (!!atcCodeList) {
      const nodeList: DrugTreeNode[] = [];
      const nodePushed = new Set();
      for (const atcCode of atcCodeList) {
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
      }
      return nodeList;
    }
    return [];
  }

  private _getAtcCode(): Observable<AtcCode[]> {
    if (this.atcCodeList?.length > 0) {
      return of(this.atcCodeList);
    }
    return this.atcCodeService.getAllAtcCode().pipe(
      map((response) => {
        const atcCodeList = response?.data?.items || [];
        this.atcCodeList = atcCodeList;
        return atcCodeList;
      })
    );
  }

  expandDrugChildren(
    treeNode: DrugTreeNode,
    flatNode: DrugFlatNode,
    callback: Function = null
  ): void {
    if (treeNode?.atcCode?.length == 5) {
      if (treeNode?.children?.length > 0) {
        return; // has data, no load
      }

      const atcCode = treeNode?.atcCode;
      const pageIndex = 0;
      const pageSize = 10000;
      const drugName = '';
      const searchRequest: AtcDrugSearchRequest = {
        level1: atcCode?.slice(0, 1),
        level2: atcCode?.slice(0, 3),
        level3: atcCode?.slice(0, 4),
        level4: atcCode?.slice(0, 5),
      };

      treeNode?.children.push({
        drugName: 'tester',
      });
      this.dataChange.next(this.data);

      // flatNode.isLoading = true;
      // this.drugService
      //   .searchDrugsByAtcCode(pageIndex, pageSize, drugName, searchRequest)
      //   .pipe(
      //     finalize(() => {
      //       flatNode.isLoading = false;
      //     })
      //   )
      //   .subscribe((response) => {
      //     const drugList = response?.data?.items || [];
      //     const nodeList: DrugTreeNode[] = drugList.map((row) => {
      //       return {
      //         drugName: row.name,
      //         drugId: row.id,
      //         drugHasGuideline: row.hasDosingGuideline,
      //         drugHasPharmgkbCa: row.hasPharmgkbCa,
      //       };
      //     });
      //     treeNode.children.push(...nodeList);
      //     this.dataChange.next(this.data);
      //     if (callback) {
      //       callback();
      //     }
      //   });
    }
  }

  getDrugByAtcCode(drugName: string, atcCodeLevel4: string): any {
    const pageIndex = 0;
    const pageSize = 10000;
    const searchRequest: AtcDrugSearchRequest = {
      level1: atcCodeLevel4.slice(0, 1),
      level2: atcCodeLevel4.slice(0, 3),
      level3: atcCodeLevel4.slice(0, 4),
      level4: atcCodeLevel4.slice(0, 5),
    };
    return this.drugService.searchDrugsByAtcCode(
      pageIndex,
      pageSize,
      drugName,
      searchRequest
    );
  }
}

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

export interface DrugFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  data: DrugTreeNode;
  isLoading: boolean;
}
