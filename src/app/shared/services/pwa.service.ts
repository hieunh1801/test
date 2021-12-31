import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  readyInstall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  installed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  deferredPrompt: any = null;

  constructor(private platform: Platform, private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe((event) => {
      window.location.reload();
    });

    window.addEventListener(
      'beforeinstallprompt',
      this.onBeforeInstallPrompt.bind(this)
    );
    window.addEventListener('appinstalled', this.onAppInstalled.bind(this));
  }

  onBeforeInstallPrompt(event: any): void {
    // check running on pwa mode or browser mode
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    if (document.referrer.startsWith('android-app://')) {
      console.log('android mode');
      // android mode
      return;
    } else if ((window.navigator as any).standalone === true || isStandalone) {
      // standalone mode
      console.log('standalone mode');
      return;
    }
    // browser mode

    // Prevent the mini-info bar from appearing on mobile
    event?.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = event;
    // readyInstall;
    if (this.platform.ANDROID && this.platform.isBrowser) {
      this.readyInstall$?.next(true);
    }
  }

  onAppInstalled(event: any): void {
    this.deferredPrompt = null;
    this.installed$.next(true);
  }

  async install() {
    const promptEvent = this.deferredPrompt;
    console.log('install', promptEvent);
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();

    const result: boolean = await promptEvent.userChoice;
    console.log(result);
    if (result) {
      this.deferredPrompt = null;
      this.readyInstall$.next(false);
    }
  }
}
