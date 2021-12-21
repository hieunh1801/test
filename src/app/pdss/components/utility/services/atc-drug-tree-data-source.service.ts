import { Injectable } from '@angular/core';
import { AtcCode } from '@pdss/components/browser/components/drug/atc-code';
import { Drug } from '@pdss/components/browser/components/drug/drug';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { PdssAtcCodeService } from './pdss-atc-code.service';
import { AtcDrugSearchRequest, PdssDrugService } from './pdss-drug.service';

@Injectable({
  providedIn: 'root',
})
export class AtcDrugTreeDataSourceService {
  dataChange = new BehaviorSubject<DrugTreeNode[]>([]);
  atcCodeList: AtcCode[] = [];
  drugListMap = new Map<string, DrugTreeNode[]>();

  get data(): DrugTreeNode[] {
    return this.dataChange.value;
  }

  constructor(
    private drugService: PdssDrugService,
    private atcCodeService: PdssAtcCodeService,
    private pageLoadingService: PageLoadingService
  ) {
    this.initTree();
  }

  initTree(): void {
    this.pageLoadingService.startLoading();
    this.getAtcCode()
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe((nodeList) => {
        const atcCodeList = nodeList;
        const treeData = this.buildTree(atcCodeList);
        this.dataChange.next(treeData);
      });
  }

  private buildTree(atcCodeList: AtcCode[], drugList?: Drug[]): DrugTreeNode[] {
    const nodeList: DrugTreeNode[] = [];
    const nodePushed = new Set();

    if (!!atcCodeList) {
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
    }

    if (!!drugList) {
      for (const drug of drugList) {
        const drugAtcCodeList = drug?.atcCodes || [];
        for (const atcCode of drugAtcCodeList) {
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
            const nodeLv4 = nodeLv3Children.find(
              (node) => node.atcCode === codeLevel4
            );
            const nodeLv4Children = nodeLv4.children;

            const existedDrug = nodeLv4Children.find(
              (d) => d.drugId === drug.id
            );
            if (!existedDrug) {
              nodeLv4Children.push(this.fromDrug(drug));
            }
          }
        }
      }
    }
    return nodeList;
  }

  private getAtcCode(): Observable<AtcCode[]> {
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

  expandDrugChildren(treeNode: DrugTreeNode, callback: Function = null): void {
    if (treeNode?.atcCode?.length == 5) {
      if (treeNode?.children?.length > 0) {
        callback ? callback() : null;
        return; // has data, no load
      }

      const atcCode = treeNode?.atcCode;

      // get cached data
      const existedNodeList = this.drugListMap.get(atcCode);
      if (existedNodeList?.length > 0) {
        treeNode.children = existedNodeList;
        this.dataChange.next(this.data);

        // callback on success
        callback ? callback() : null;
        return;
      }

      const pageIndex = 0;
      const pageSize = 10000;
      const drugName = '';
      const searchRequest: AtcDrugSearchRequest = {
        level1: atcCode?.slice(0, 1),
        level2: atcCode?.slice(0, 3),
        level3: atcCode?.slice(0, 4),
        level4: atcCode?.slice(0, 5),
      };

      this.drugService
        .searchDrugsByAtcCode(pageIndex, pageSize, drugName, searchRequest)
        .pipe(
          finalize(() => {
            callback ? callback() : null;
          })
        )
        .subscribe((response) => {
          const drugList = response?.data?.items || [];
          const nodeList: DrugTreeNode[] = this.fromDrugList(drugList);
          treeNode.children = nodeList;

          // cached drug list
          this.drugListMap.set(atcCode, nodeList);

          // notify data change
          this.dataChange.next(this.data);
        });
    }
  }

  private fromDrugList(drugList: Drug[]): DrugTreeNode[] {
    if (!drugList) {
      return [];
    }
    return drugList.map(this.fromDrug);
  }

  private fromDrug(drug: Drug): DrugTreeNode {
    if (!drug) {
      return null;
    }
    return {
      drugName: drug.name,
      drugId: drug.id,
      drugHasGuideline: drug.hasDosingGuideline,
      drugHasPharmgkbCa: drug.hasPharmgkbCa,
      drugHasPharmgkbDruglabel: drug.hasPharmgkbDruglabel,
      drugHasPharmgkbGuideline: drug.hasPharmgkbGuideline,
      drugHasPharmgkbVa: drug.hasPharmgkbVa,
      drugHasRxAnnotation: drug.hasRxAnnotation,
      drugHasSpmedGuideline: drug.hasSpmedGuideline,
    } as DrugTreeNode;
  }

  private getDrugByAtcCode(
    drugName: string,
    atcCodeLevel4?: string
  ): Observable<Drug[]> {
    const pageIndex = 0;
    const pageSize = 10000;
    const searchRequest: AtcDrugSearchRequest = {
      level1: atcCodeLevel4?.slice(0, 1) || '',
      level2: atcCodeLevel4?.slice(0, 3) || '',
      level3: atcCodeLevel4?.slice(0, 4) || '',
      level4: atcCodeLevel4?.slice(0, 5) || '',
    };
    return this.drugService
      .searchDrugsByAtcCode(pageIndex, pageSize, drugName, searchRequest)
      .pipe(
        map((response) => {
          return response?.data?.items || [];
        })
      );
  }

  /**
   *
   * @param keyword: drugName, atcName
   * @param mode : 0-all, 1-atc, 2-drug
   */
  public searchByKeyword(
    keyword: string,
    mode: number,
    callback?: Function
  ): void {
    keyword = keyword?.toLocaleLowerCase() || '';
    if (!keyword) {
      return;
    }
    const atcCodeListFiltered = this.atcCodeList.filter((row) => {
      const result1 = row.codeLevel1.toLocaleLowerCase().includes(keyword);
      const result2 = row.codeLevel2.toLocaleLowerCase().includes(keyword);
      const result3 = row.codeLevel3.toLocaleLowerCase().includes(keyword);
      const result4 = row.codeLevel4.toLocaleLowerCase().includes(keyword);
      return result1 || result2 || result3 || result4;
    });

    if (mode === 1) {
      const treeData = this.buildTree(atcCodeListFiltered);
      this.dataChange.next(treeData);
      callback ? callback() : null;
      return;
    } else {
      this.pageLoadingService.startLoading();
      this.getDrugByAtcCode(keyword)
        .pipe(
          finalize(() => {
            this.pageLoadingService.stopLoading();
            callback ? callback() : null;
          })
        )
        .subscribe((drugNodeList) => {
          const treeData =
            mode === 0
              ? this.buildTree(atcCodeListFiltered, drugNodeList)
              : this.buildTree([], drugNodeList);
          console.log(mode, treeData);
          this.dataChange.next(treeData);
        });
    }
  }

  public resetSearch(): void {
    const atcCodeList = this.atcCodeList;
    const treeData = this.buildTree(atcCodeList);
    this.dataChange.next(treeData);
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
