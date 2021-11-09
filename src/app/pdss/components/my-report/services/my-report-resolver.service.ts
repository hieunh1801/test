import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdssReportService, Report } from './pdss-report.service';

@Injectable({
  providedIn: 'root',
})
export class MyReportResolverService implements Resolve<Report> {
  constructor(private pdssReportService: PdssReportService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Report> {
    return this.pdssReportService.getMyReport().pipe(
      map((response) => {
        const report = response?.data?.items?.[0];
        return report;
      })
    );
  }
}
