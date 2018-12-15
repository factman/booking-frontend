import { Component, OnInit, OnDestroy, Renderer, Inject, ElementRef } from '@angular/core';
import * as Rellax from 'rellax';
import { DOCUMENT } from '@angular/platform-browser';
import { Location } from '@angular/common';
import AOS from 'aos';
import { TerminalService } from './terminal.service';
import 'rxjs/add/operator/filter';



@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [
        TerminalService
    ]
})
export class MainComponent implements OnInit, OnDestroy {
    navbar: HTMLElement;
    constructor(
        private element: ElementRef,
        public location: Location,
    ) { }

    ngOnInit() {
        AOS.init();
        const rellaxHeader = new Rellax('.rellax-header');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('main-page');

        window.addEventListener('scroll', this.scrollingHandler, false);
    }

    scrollingHandler() {
        const number = window.scrollY;
        const navbar = document.getElementsByTagName('nav')[0];
        if (number > 100 || window.pageYOffset > 100) {
            navbar.classList.remove('navbar-transparent');
        } else {
            // remove logic
            navbar.classList.add('navbar-transparent');
        }
    }
    ngOnDestroy() {
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('main-page');
        window.removeEventListener('scroll', this.scrollingHandler, false);
    }

}
