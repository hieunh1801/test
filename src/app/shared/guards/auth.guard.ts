import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TokenStorageService } from '@shared/services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  // Require login to active this router
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogin = !!(
      this.tokenStorageService.accessToken && this.tokenStorageService.username
    );
    if (!isLogin) {
      const requireLoginStr = this.translateService.instant(
        'AUTH_GUARD__REQUIRE_LOGIN'
      );
      const loginStr = this.translateService.instant('AUTH_GUARD__LOGIN');
      this.matSnackbarService.open(requireLoginStr, loginStr);

      setTimeout(() => {
        this.router.navigate(['/auth/login'], {
          queryParams: { redirectFromUrl: state.url },
        });
      }, 1500);
    } else {
      return true;
    }
  }
}
