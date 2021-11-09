import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '@shared/services/token-storage.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.tokenStorageService.accessToken;
    if (
      accessToken !== null &&
      accessToken !== undefined &&
      accessToken !== 'null' &&
      accessToken !== 'undefined'
    ) {
      request = request.clone({
        setHeaders: {
          'access-token': `${accessToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
