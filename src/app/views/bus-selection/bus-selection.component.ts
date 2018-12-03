import { Component, OnInit, OnDestroy } from '@angular/core';
// import * as Rellax from 'rellax';

@Component({
    selector: 'app-bus-selection',
    templateUrl: './bus-selection.component.html',
    styleUrls: ['./bus-selection.component.scss']
})
export class BusSelectionComponent implements OnInit, OnDestroy {
    primaryColor: string;
    constructor() {
        this.primaryColor = '#f96332';
    }

    ngOnInit() {
        // const rellaxHeader = new Rellax('.rellax-header');

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('bus-selection-page');
    }

    ngOnDestroy() {
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('bus-selection-page');
    }

}
