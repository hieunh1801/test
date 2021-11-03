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
      title: 'KR',
      value: LanguagesProvidedType.korea,
    },
    {
      title: 'EN',
      value: LanguagesProvidedType.english,
    },
  ];

  private defaultLanguage = LanguagesProvidedType.korea;
  private selectedLanguage: string;

  constructor(
    private localStorageService: LocalStorageService,
    public translateService: TranslateService
  ) {}

  isLanguageValid(lang: string): boolean {
    return (Object.values(LanguagesProvidedType) as string[]).includes(lang);
  }

  init(): void {
    let mSelectedLanguage =
      this.localStorageService.get<string>('lang') ||
      LanguagesProvidedType.korea;

    if (!this.isLanguageValid(mSelectedLanguage)) {
      mSelectedLanguage = this.defaultLanguage;
      this.localStorageService.set<string>('lang', mSelectedLanguage);
    }
    // set text translation
    this.selectedLanguage = mSelectedLanguage;
    this.translateService.currentLang = mSelectedLanguage;
    let translateFile;
    switch (mSelectedLanguage) {
      case LanguagesProvidedType.korea:
        translateFile = krTranslation;
        break;
      case LanguagesProvidedType.english:
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

    // change current language
    this.selectedLanguage = lang;
    this.translateService.use(lang);
    this.localStorageService.set('lang', lang);
  }
}

export enum LanguagesProvidedType {
  korea = 'kr',
  english = 'en',
}
