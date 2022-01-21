import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  locationList = [
    {
      name: marker('CONTACT__LOCATIONS__HEAD_QUARTER'),
      address: marker('CONTACT__LOCATIONS__HEAD_QUARTER__ADDRESS'),
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6516.036399931357!2d129.012829!3d35.255803!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdd2d827746f9974c!2zKOyjvCnsl5DsiqTtlLzrqZTrk5w!5e0!3m2!1sko!2skr!4v1642741399735!5m2!1sko!2skr',
    },
    {
      name: marker('CONTACT__LOCATIONS__SEOUL'),
      address: marker('CONTACT__LOCATIONS__SEOUL__ADDRESS'),
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1881.5738137415203!2d126.92665472702406!3d37.521658066526314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f3ddd4ee549%3A0x88f4948a3c9814c7!2s709%2C%2030%20Gukjegeumyung-ro%206-gil%2C%20Yeongdeungpo-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1642742567580!5m2!1sen!2skr',
    },
    {
      name: marker('CONTACT__LOCATIONS__SUWON'),
      address: marker('CONTACT__LOCATIONS__SUWON__ADDRESS'),
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1586.9718521814284!2d127.04000435824217!3d37.29646802868952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5b110e551351%3A0x3c55b4384e3d0b1e!2z6rSR6rWQ7JeQ7J207IqkM-ywqA!5e0!3m2!1sen!2skr!4v1642752753171!5m2!1sen!2skr',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
