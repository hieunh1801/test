import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';

import enTranslation from '../../../assets/i18n/en.json';
import krTranslation from '../../../assets/i18n/kr.json';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public languageOptions = [
    {
      title: 'Korea',
      value: LanguagesProvided.korea,
    },
    {
      title: 'English',
      value: LanguagesProvided.english,
    },
  ];

  private defaultLanguage = LanguagesProvided.korea;
  private selectedLanguage: string;

  constructor(
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {}

  isLanguageValid(lang: string): boolean {
    return (Object.values(LanguagesProvided) as string[]).includes(lang);
  }

  init(): void {
    let mSelectedLanguage =
      this.localStorageService.get<string>('lang') || LanguagesProvided.korea;

    if (!this.isLanguageValid(mSelectedLanguage)) {
      mSelectedLanguage = this.defaultLanguage;
      this.localStorageService.set<string>('lang', mSelectedLanguage);
    }

    this.selectedLanguage = mSelectedLanguage;
    this.translateService.currentLang = mSelectedLanguage;
    let translateFile;
    switch (mSelectedLanguage) {
      case LanguagesProvided.korea:
        translateFile = krTranslation;
        break;
      case LanguagesProvided.english:
        translateFile = enTranslation;
        break;
      default:
        translateFile = this.defaultLanguage;
    }

    this.translateService.setTranslation(mSelectedLanguage, translateFile);
    this.translateService.setDefaultLang(mSelectedLanguage);
    // console.log('localStorage -', mSelectedLanguage);
  }

  get currentLanguage(): string {
    return this.selectedLanguage;
  }

  set currentLanguage(lang: string) {
    if (!this.isLanguageValid(lang)) {
      lang = this.defaultLanguage;
    }

    this.selectedLanguage = lang;
    this.translateService.use(lang);
    this.localStorageService.set('lang', lang);
  }
}

export enum LanguagesProvided {
  korea = 'kr',
  english = 'en',
}
