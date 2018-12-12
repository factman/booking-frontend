import { Component, OnInit, OnDestroy } from '@angular/core';
import Choices from 'choices.js';

@Component({
    selector: 'app-passager-details',
    templateUrl: './passager-details.component.html',
    styleUrls: ['./passager-details.component.scss']
})
export class PassagerDetailsComponent implements OnInit, OnDestroy {
    primaryColor: string;
    constructor() {
        this.primaryColor = '#f96332';
    }

    ngOnInit() {
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('passager-details-page');
    }

    ngOnDestroy() {
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('passager-details-page');
    }

    initialDeclaration() {
        const gender = document.getElementById('gender');
        const choicesFrom = new Choices(gender);
    }

}
