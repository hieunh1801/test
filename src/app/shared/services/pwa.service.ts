import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  readyInstall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  deferredPrompt: any = null;

  constructor() {
    console.log('config pwa service');
    window.addEventListener(
      'beforeinstallprompt',
      this.onBeforeInstallPrompt.bind(this)
    );
    window.addEventListener('appinstalled', this.onAppInstalled.bind(this));
  }

  onBeforeInstallPrompt(event: any): void {
    // Prevent the mini-info bar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = event;
    // readyInstall;
    this.readyInstall$?.next(true);
  }

  onAppInstalled(event: any): void {
    this.deferredPrompt = null;
    this.readyInstall$.next(false);
  }

  async install() {
    const promptEvent = this.deferredPrompt;
    if (!promptEvent) {
      return;
    }

    promptEvent.prompt();

    const result: boolean = await promptEvent.userChoice;

    if (result) {
      this.deferredPrompt = null;
      this.readyInstall$.next(false);
    }
  }
}
