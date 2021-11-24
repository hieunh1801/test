import { Drug } from '../drug/drug';
import { GeneKr } from './gene-kr';
// import { Roe } from '../roe/roe';
// import { Phenotype } from './phenotype';

export class Gene {
  id: number;
  symbol: string;
  name: string;
  scientificName: string;
  alias: string;
  position: string;

  idPharmgkb: string;
  idNcbi: string;
  idHgnc: string;
  idEnsembl: string;

  isVip: number;
  hasVariantAnnotation: number;
  hasCpicDosingGuideline: number;
  hasGuideline: number;

  chromosomes: string;
  grch37Start: string;
  grch37Stop: string;
  grch38Start: string;
  grch38Stop: string;

  description: string;
  summary: string;
  phenotypeAnnotationSpmed: string;
  geneAnnotationSpmed: string;

  interpretationTypeId: string;

  createdTime: string;
  createdActor: string;
  updatedTime: string;
  updatedActor: string;
  drugs: Array<Drug>;

  // roes: Array<Roe>;

  kr: GeneKr;

  displayGrch37: string;
  displayGrch38: string;

  rsids: Array<string>;
  // phenotypes: Array<Phenotype>;

  hasPharmgkbGuideline: number;
  hasPharmgkbDruglabel: number;
  hasPharmgkbCa: number;
  hasPharmgkbVa: number;
  hasSpmedGuideline: number;
}

export class VirtualVariant {
  geneId: number;
  geneSymbol: string;
  rsid: string;
  phenotypeId: number;
  phenotype: string;
}
