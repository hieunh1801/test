import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackbarService } from '../services/mat-snackbar.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private matSnackbarService: MatSnackbarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let canTurn = true;
    setTimeout(() => {
      if (canTurn) {
        // this.matSnackbarService.open('HELLO WORLD', 'GET');
        // TODO add loading for all website here
      }
    }, 500);

    return next.handle(req).pipe(
      finalize(() => {
        canTurn = false;
      })
    );
  }
}
