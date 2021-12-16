import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private readonly joyrideService: JoyrideService) {}
  ngOnInit(): void {
    this.startTour();
  }

  startTour() {
    console.log(this.joyrideService);
    this.joyrideService.startTour(
      { steps: ['firstStep', 'secondStep'] } // Your steps order
    );
  }
}
