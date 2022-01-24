import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from '@shared/services/language.service';
import { CustomerBoardTag } from '../../services/news.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  @Input() tagList: CustomerBoardTag[] = [];

  dataSource: CustomerBoardTag[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {}

  loadDataSource(): void {
    const currentLanguage = this.languageService.currentLanguage;
    const dataSource = this.tagList.map((tag) => {
      if (currentLanguage === 'kr') {
        return { ...tag, ...tag.kr };
      } else {
        return {
          ...tag,
        };
      }
    });

    this.dataSource = dataSource;
  }
}
