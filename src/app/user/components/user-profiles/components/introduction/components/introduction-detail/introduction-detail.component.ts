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
    'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w';

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
