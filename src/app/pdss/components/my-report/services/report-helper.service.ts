import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DrugRecommendation, Report } from './pdss-report.service';

@Injectable({
  providedIn: 'root',
})
export class ReportHelperService {
  constructor(private translateService: TranslateService) {}

  getStatistic(packageName: string, reportList?: Report[]): ReportsStatistic {
    if (!reportList || reportList.length === 0) {
      return null;
    }

    const drugRecommendations: DrugRecommendation[] = [];
    for (const report of reportList) {
      const productName = report.productName;
      for (const drug of report?.drugRecommendations || []) {
        drugRecommendations.push({
          ...drug,
          product: productName,
        });
      }
    }

    // summary total drug
    const drugName = new Set();
    for (const drugRecommendation of drugRecommendations) {
      drugName.add(drugRecommendation.drugName);
    }
    const totalDrug = drugName.size;

    // STATISTIC -> total gene
    const geneSymbolSet = new Set();
    for (const drugRecommendation of drugRecommendations) {
      const genes = drugRecommendation?.genes;
      if (genes) {
        for (const gene of genes) {
          geneSymbolSet.add(gene.symbol);
        }
      }
    }
    const totalGene = geneSymbolSet.size;

    // STATISTIC -> total interpretation
    const totalInterpretation = drugRecommendations
      .map((drugRecommendation) => {
        return drugRecommendation?.genes?.length || 0;
      })
      .reduce((pre, currentValue) => {
        return pre + currentValue;
      }, 0);

    //  STATISTIC -> total good
    const goodTxt = this.translateService.instant('PDSS__RISK_LEVEL__GOOD');
    const totalGood = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === goodTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );

    // STATISTIC -> total caution
    const cautionTxt = this.translateService.instant(
      'PDSS__RISK_LEVEL__CAUTION'
    );
    const totalCaution = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === cautionTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );

    // STATISTIC -> total warning
    const warningTxt = this.translateService.instant(
      'PDSS__RISK_LEVEL__WARNING'
    );
    const totalWarning = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === warningTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );

    // total danger
    const dangerTxt = this.translateService.instant('PDSS__RISK_LEVEL__DANGER');
    const totalDanger = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === dangerTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );

    const result: ReportsStatistic = {
      packageName,
      totalDrug,
      totalGene,
      totalInterpretation,

      totalDanger,
      totalWarning,
      totalCaution,
      totalGood,

      percentDanger: ((totalDanger * 100) / totalDrug).toFixed(2),
      percentWarning: ((totalWarning * 100) / totalDrug).toFixed(2),
      percentCaution: ((totalCaution * 100) / totalDrug).toFixed(2),
      percentGood: ((totalGood * 100) / totalDrug).toFixed(2),
    };
    return result;
  }
}

export interface ReportsStatistic {
  packageName: string;

  totalDrug: number;
  totalGene: number;
  totalInterpretation: number;

  // for risk statistic
  totalDanger: number;
  totalWarning: number;
  totalCaution: number;
  totalGood: number;

  //
  percentDanger: string;
  percentWarning: string;
  percentCaution: string;
  percentGood: string;
}
