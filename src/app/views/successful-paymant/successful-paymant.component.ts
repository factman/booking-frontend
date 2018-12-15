import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-successful-paymant',
    templateUrl: './successful-paymant.component.html',
    styleUrls: ['./successful-paymant.component.scss']
})
export class SuccessfulPaymantComponent implements OnInit, OnDestroy {

    primaryColor: string;
    constructor() {
        // this.primaryColor = '#f96332';
    }

    ngOnInit() {
        // const navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.add('navbar-transparent');
        // const body = document.getElementsByTagName('body')[0];
        // body.classList.add('successful-payment-page');
    }

    ngOnDestroy() {
        // const navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.remove('navbar-transparent');
        // const body = document.getElementsByTagName('body')[0];
        // body.classList.remove('successful-payment-page');
    }

}
