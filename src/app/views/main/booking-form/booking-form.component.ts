import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import Choices from 'choices.js';
import { CustomDate } from './customdate.model'
import { TerminalService } from '../terminal.service';
import { BookingService } from 'app/views/booking.service';

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss'],
    providers: [NgbDatepickerConfig]
})
export class BookingFormComponent implements OnInit {
    departure = new CustomDate();
    constructor(
        config: NgbDatepickerConfig,
        calendar: NgbCalendar,
        private terminal: TerminalService,
        private booking: BookingService,
        private router: Router
    ) {

        config.minDate = { year: 1900, month: 1, day: 1 };
        config.maxDate = { year: 2099, month: 12, day: 31 };

        // days that don't belong to current month are not visible
        config.outsideDays = 'hidden';

        // days before today and tday are disabled
        config.markDisabled = (date: NgbDate) => {
            const today = calendar.getToday();
            if (date.year < today.year) {
                return true
            } else if (date.year === today.year) {
                if (date.month < today.month) {
                    return true
                } else if (date.month === today.month) {
                    if (date.day < today.day) {
                        return true;
                    } else if (date.day === today.day) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    ngOnInit() {
        this.initialSelectFields();
        // this.onClickTripType();
    }

    initialSelectFields() {
        const travellingFrom = document.getElementById('travellingFrom');
        const travellingTo = document.getElementById('travellingTo');
        const adult = document.getElementById('adult');
        const choicesFrom = new Choices(travellingFrom);
        const choicesAdult = new Choices(adult);
        const choicesTo = new Choices(travellingTo);
        choicesFrom.setChoices(this.terminal.data, 'value', 'label', false);
        choicesTo.setChoices(this.terminal.data, 'value', 'label', false);

        if (this.booking.departure !== undefined) {
            choicesFrom.setChoiceByValue(this.booking.departure)
        }

        if (this.booking.destination !== undefined) {
            choicesTo.setChoiceByValue(this.booking.destination)
        }

        if (this.booking.numberOfBooking !== undefined) {
            choicesAdult.setChoiceByValue(`${this.booking.numberOfBooking}`)
        }

        if (this.booking.dateBooked.year !== null) {
            this.departure = this.booking.dateBooked;
        }




        travellingFrom.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.departure = (<CustomEvent>event).detail.value;

        }, false);

        travellingTo.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.destination = (<CustomEvent>event).detail.value;
        }, false);

        adult.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.numberOfBooking = parseInt((<CustomEvent>event).detail.value, 10);
        }, false);
    }

    // onClickTripType() {
    //     const trips = document.querySelectorAll('.trip');
    //     (<any>trips).forEach(trip => {
    //         (<HTMLElement>trip).addEventListener('click', (e) => {
    //             const currentTrip = (<HTMLElement>e.target);
    //             this.booking.trip = currentTrip.textContent;
    //             this.arrivalStatus = currentTrip.textContent.toLowerCase() === 'round trip';
    //             currentTrip.classList.add('active');
    //             if (currentTrip.nextElementSibling) {
    //                 (<HTMLElement>currentTrip.nextElementSibling).classList.remove('active');
    //             } else {
    //                 (<HTMLElement>currentTrip.previousElementSibling).classList.remove('active');
    //             }
    //         })
    //     })
    // }

    onSubmit() {
        if (this.departure.year !== null) {
            this.booking.dateBooked = this.departure
            this.router.navigate(['bus-selection']);
        }
    }



}
