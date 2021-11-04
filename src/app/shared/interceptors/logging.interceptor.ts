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

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    let status: string;
    let data: any;

    if (environment.logRequest) {
      return next.handle(req).pipe(
        tap(
          (event) => {
            status = '';
            if (event instanceof HttpResponse) {
              status = 'succeeded';
              data = event;
            }
          },
          (error) => (status = 'failed')
        ),
        finalize(() => {
          const elapsedTime = Date.now() - startTime;
          const method = req.method;
          const methodStyle =
            'font-weight: 600; background-color:#2a3950; color: white; border-radius: 2px; padding: 2px 5px';
          const details = {
            url: req.url,
            params: req.params,
            body: req.body,
          };
          console.log(
            `%c${method}`,
            methodStyle,
            `${req.urlWithParams} in ${elapsedTime}ms`
          );
          console.log('↳', data?.body);
        })
      );
    }

    return next.handle(req);
  }
}
