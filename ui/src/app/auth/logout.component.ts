import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './auth.service';
import { AboutService } from '../about/about.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { NotificationService } from '../shared/services/notification.service';
import { LoggerService } from '../shared/services/logger.service';
import { AppError } from '../shared/model/error.model';

/**
 * Handles logouts. Logouts are handled differently depending on whether
 * traditional Spring Security is used on the server-side or whether
 * OAuth2 security is used.
 *
 * @author Gunnar Hillert
 */
@Component({
  template: ''
})
export class LogoutComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$: Subject<any> = new Subject();

  constructor(
    private authService: AuthService,
    private aboutService: AboutService,
    private notificationService: NotificationService,
    private loggerService: LoggerService,
    private router: Router) {
  }

  /**
   * Logging out.
   */
  public ngOnInit() {
    if (!this.authService.securityInfo.isAuthenticationEnabled) {
      this.loggerService.log('No need to logout. Authentication is not enabled.');
      this.router.navigate(['']);
      return;
    } else if (!this.authService.securityInfo.isAuthenticated) {
      this.loggerService.log('No need to logout. User is not authenticated.');
      this.router.navigate(['']);
      return;
    }

    this.loggerService.log('Logging out ...');
    if (this.authService.securityInfo.isFormLogin) {
      this.authService.logout()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        result => {
          this.aboutService.featureInfo.reset();
          this.notificationService.success('Logged out.');
          this.router.navigate(['login']);
        },
        error => {
          this.aboutService.featureInfo.reset();
          this.notificationService.error(AppError.is(error) ? error.getMessage() : error);
        },
      );
    } else {
      this.loggerService.log(`Logging out user ${this.authService.securityInfo.username} (OAuth)`);
      this.authService.clearLocalSecurity();
      this.aboutService.featureInfo.reset();

      const logoutUrl = '//' + window.location.host + '/logout';
      this.loggerService.log('Redirecting to ' + logoutUrl);
      window.open(logoutUrl, '_self');
    }
  }

  /**
   * Will cleanup any {@link Subscription}s to prevent
   * memory leaks.
   */
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
