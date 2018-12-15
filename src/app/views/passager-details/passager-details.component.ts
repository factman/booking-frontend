import { Component, OnInit, OnDestroy } from '@angular/core';
import Choices from 'choices.js';
import { BookingService } from '../booking.service';

@Component({
    selector: 'app-passager-details',
    templateUrl: './passager-details.component.html',
    styleUrls: ['./passager-details.component.scss']
})
export class PassagerDetailsComponent implements OnInit, OnDestroy {
    primaryColor: string;
    constructor(private booking: BookingService) {
        this.primaryColor = '#f96332';
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    initialDeclaration() {
        const gender = document.getElementById('gender');
        const choicesGender = new Choices(gender);

        gender.addEventListener('addItem', (event) => {
            this.booking.gender = (<CustomEvent>event).detail.value;
        }, false);

        if (this.booking.gender !== undefined) {
            choicesGender.setChoiceByValue(this.booking.gender);
        }

        this.getElementValue('firstname');
        this.getElementValue('lastname');
        this.getElementValue('email');
        this.getElementValue('phone');
        this.getElementValue('nextEmail');
        this.getElementValue('nextName');
        this.getElementValue('nextPhone');
    }

    updateValue(event) {
        this.booking[event.target.name] = event.target.value;
    }

    getElementValue(name) {
        if (this.booking[name]) {
            const getElement = <HTMLInputElement>document.getElementById(name);
            getElement.value = this.booking[name];
        }
    }

    getBooking() {
        console.log(this.booking);
    }

}
