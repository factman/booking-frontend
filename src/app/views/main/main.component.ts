import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rellax from 'rellax';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit() {
        const rellaxHeader = new Rellax('.rellax-header');

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('main-page');
    }
    ngOnDestroy() {
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('main-page');
    }

}
