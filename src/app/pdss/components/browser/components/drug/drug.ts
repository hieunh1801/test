// import { DrugBizGroup } from '../drug-biz-group/drug-biz-group';
import { Gene } from '../gene/gene';
import { AtcCode } from './atc-code';
import { DrugKr } from './drug-kr';

export class Drug {
  id: number;
  name: string;
  summary: string;
  category: string;
  diseaseClass: string;
  kpicClass: string;
  drugKfdaClassId: number;
  kfdaClass: string;
  kfdaClassSpmed: string;

  indicationClassSpmed: string;
  indicationSpmed: string;
  indicationSummarySpmed: string;
  toxicitySummarySpmed: string;
  foodInteractionSpmed: string;

  externalVocabulary: string;
  clinicalAnnotationLevel: string;
  fdaLabelTestingLevel: string;
  drugLabelTestingLevel: string;

  clinicalAnnotationCount: number;
  variantAnnotationCount: number;
  pathwayCount: number;
  vipCount: number;

  hasGuideline: number;
  hasDosingGuideline: number;
  labelHasDosingInfo: number;
  hasRxAnnotation: number;

  exVoca?: string | string[];
  rxnormIdentifier: string;
  atcIdentifier: string;
  atcCodes: AtcCode[];
  pubchemCompoundIdentifier: string;
  idPharmgkb: string;
  idDrugbank: string;

  interpretationTypeId: string;

  createdTime: string;
  createdActor: string;
  updatedTime: string;
  updatedActor: string;

  genes: Array<Gene>;
  // bizGroups: Array<DrugBizGroup>;
  kr: DrugKr;

  displayName: string;
  displayCategory: string;
  displayDiseaseClass: string;
  displayKpicClass: string;
  displayKfdaClass: string;
  displayKfdaClassSpmed: string;

  // product registration
  // displayVariants: Array<VirtualVariant>;

  hasPharmgkbGuideline: number;
  hasPharmgkbDruglabel: number;
  hasPharmgkbCa: number;
  hasPharmgkbVa: number;
  hasSpmedGuideline: number;
}
