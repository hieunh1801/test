import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gene } from './gene';
import { GeneKr } from './gene-kr';
import { GeneService } from '../../services/gene.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.scss'],
})
export class GeneComponent implements OnInit, OnDestroy {
  subscriptions$ = new Subscription();
  gene: Gene;
  geneId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private geneService: GeneService,
    private pageLoadingService: PageLoadingService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const sub = this.route.params.subscribe((params) => {
      this.geneId = +params['id'];
    });
    this.loadGeneDetail();
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  loadGeneDetail(): void {
    this.pageLoadingService.startLoading();
    this.geneService
      .getById(this.geneId)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.items?.[0]) {
            this.onGetGene(response.data.items);
          } else {
            this.gene = null;
          }
        },
        error: () => {
          const message = this.translateService.instant(
            'PDSS__BROWSER__LOAD_GENE_FAILED'
          );
          const action = this.translateService.instant(
            'MAT_SNACKBAR__ACTION__GET'
          );
          this.matSnackbarService.open(message, action);
        },
      });
  }

  onGetGene(gene: Gene): void {
    this.gene = gene;
  }
}
