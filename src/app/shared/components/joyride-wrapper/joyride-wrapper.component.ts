import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-joyride-wrapper',
  templateUrl: './joyride-wrapper.component.html',
  styleUrls: ['./joyride-wrapper.component.scss'],
})
export class JoyrideWrapperComponent implements OnInit {
  @Input() webGuideStep: string;
  @Input() webGuideContent: string;
  @Input() rowIndex: number;
  @Input() inlineBlock: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
