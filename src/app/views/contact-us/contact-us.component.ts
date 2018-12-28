import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  lat: Number = 6.49156905072005;
  lng: Number = 7.154750300000046;

  constructor() { }

  ngOnInit() { }

}
