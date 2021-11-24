import { Component, Input, OnInit } from '@angular/core';
import { Demographic, UserProfile } from '@user/services/user-profile.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  @Input() userProfile$ = new BehaviorSubject<UserProfile>(null);

  mode: 'VIEW' | 'EDIT' = 'EDIT';

  constructor() {}

  ngOnInit(): void {}

  handleEditEvent(): void {
    console.log(
      '🚀 ~ file: introduction.component.ts ~ line 20 ~ IntroductionComponent ~ handleEditEvent ~ void'
    );
  }
}
