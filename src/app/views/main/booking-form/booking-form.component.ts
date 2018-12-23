import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDatepickerConfig, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Choices from 'choices.js';
import { CustomDate } from './customdate.model'
import { TerminalService } from '../terminal.service';
import { BookingService } from 'app/views/booking.service';
import { AjaxService } from 'app/ajax.service';
import { setLocalStorage } from '../../../helpers/logic';

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss'],
    providers: [NgbDatepickerConfig]
})
export class BookingFormComponent implements OnInit, OnDestroy {
    departure = new CustomDate();
    choicesFrom: any;
    choicesTo: any;
    dataTerminals: any[];
    bookingForm: FormGroup;
    getBookingForm: {};

    constructor(
        config: NgbDatepickerConfig,
        calendar: NgbCalendar,
        private terminal: TerminalService,
        private booking: BookingService,
        private router: Router,
        private ajaxService: AjaxService
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
        this.bookingForm = new FormGroup({
            'travellingFrom': new FormControl(null, [Validators.required]),
            'travellingTo': new FormControl(null, [Validators.required]),
            'dateDeparture': new FormControl(null, [Validators.required]),
            'adult': new FormControl(null, [Validators.required])
        });
    }

    initialSelectFields() {
        const travellingFrom = document.getElementById('travellingFrom');
        const travellingTo = document.getElementById('travellingTo');
        const adult = document.getElementById('adult');
        this.choicesFrom = new Choices(travellingFrom, {
            placeholderValue: 'Select Departure'
        });
        const choicesAdult = new Choices(adult);
        this.choicesTo = new Choices(travellingTo, {
            placeholderValue: 'Select Destination'
        });

        if (this.booking.departure !== undefined) {
            this.choicesFrom.setChoiceByValue(this.booking.departure)
        }

        if (this.booking.destination !== undefined) {
            this.choicesTo.setChoiceByValue(this.booking.destination)
        }

        if (this.booking.numberOfBooking !== undefined) {
            choicesAdult.setChoiceByValue(`${this.booking.numberOfBooking}`)
        }

        if (this.booking.dateBooked.year !== null) {
            this.departure = this.booking.dateBooked;
        }

        this.ajaxService.getData('https://jibrila.herokuapp.com/api/pmt-booking/terminals')
            .subscribe((response: any) => {
                this.dataTerminals = response.payload.map(
                    // tslint:disable-next-line:no-shadowed-variable
                    (terminal: any) => ({ label: `${terminal.name}, ${terminal.city}`, value: `${terminal.id}` }
                    ));
                if (this.dataTerminals.length > 0) {
                    this.choicesFrom.setChoices(this.dataTerminals, 'value', 'label', false);
                    this.choicesTo.setChoices(this.dataTerminals, 'value', 'label', false);
                }
            })




        travellingFrom.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.departure = (<CustomEvent>event).detail.value;

        }, false)
        travellingFrom.addEventListener('showDropdown', () => {
            this.bookingForm.get('travellingFrom').markAsTouched();
        }, false);

        travellingTo.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.destination = (<CustomEvent>event).detail.value;
        }, false);

        travellingTo.addEventListener('showDropdown', () => {
            this.bookingForm.get('travellingTo').markAsTouched();
        }, false);

        adult.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.numberOfBooking = parseInt((<CustomEvent>event).detail.value, 10);
        }, false);

        adult.addEventListener('showDropdown', () => {
            this.bookingForm.get('adult').markAsTouched();
        }, false);
    }

    onSubmit() {
        this.booking.dateBooked = this.departure
        this.router.navigate(['bus-selection']);
        console.log(this.bookingForm);
    }

    ngOnDestroy() {
        this.getBookingForm = {
            travellingFrom: this.bookingForm.value.travellingFrom,
            travellingTo: this.bookingForm.value.travellingTo,
            adult: this.bookingForm.value.adult,
            dateDeparture: this.bookingForm.value.dateDeparture,
        }
        setLocalStorage('bookingPhaseOne', this.getBookingForm);
    }



}
