import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-joyride-wrapper',
  templateUrl: './joyride-wrapper.component.html',
  styleUrls: ['./joyride-wrapper.component.scss'],
})
export class JoyrideWrapperComponent implements OnInit {
  @Input() webGuideStep: string;
  @Input() webGuideContent: string;
  @Input() rowIndex: number;

  constructor() {}

  ngOnInit(): void {}
}
