import { Component, Input, OnInit } from '@angular/core';
import { Demographic } from '@user/services/user-profile.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss'],
})
export class BasicInformationComponent implements OnInit {
  @Input() demographic$ = new BehaviorSubject<Demographic>(null);

  mode: 'VIEW' | 'EDIT' | 'ADD' = null;

  init(): void {
    this.mode = 'VIEW';
  }
  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  changeMode(mode: 'VIEW' | 'EDIT' | 'ADD'): void {
    this.mode = mode;
  }
}
