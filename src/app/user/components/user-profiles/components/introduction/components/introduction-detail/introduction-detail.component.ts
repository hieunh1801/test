import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Demographic, UserProfile } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-introduction-detail',
  templateUrl: './introduction-detail.component.html',
  styleUrls: ['./introduction-detail.component.scss'],
})
export class IntroductionDetailComponent implements OnInit, OnDestroy {
  @Input() userProfile$ = new BehaviorSubject<UserProfile>(null);

  @Output() editEvent = new EventEmitter();

  defaultImageUrl =
    'https://i.pinimg.com/originals/0e/9a/ba/0e9aba47d9430b80e41c09b9cfce595f.png';

  demographic: Demographic = null;
  email: string = null;

  subscription$ = new Subscription();

  constructor() {}

  subscribeUserProfileChange(): void {
    const sub = this.userProfile$
      .pipe(distinctUntilChanged())
      .subscribe((userProfile) => {
        this.email = userProfile?.email;
        this.demographic = userProfile?.demographic;
      });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeUserProfileChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  editClick(): void {
    this.editEvent.emit();
  }
}
