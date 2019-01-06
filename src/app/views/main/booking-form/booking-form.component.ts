import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { NgbDatepickerConfig, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Choices from 'choices.js';
import { CustomDate } from './customdate.model'
import { TerminalService } from '../terminal.service';
import { BookingService } from 'app/views/booking.service';
import { AjaxService } from 'app/ajax.service';
import { setLocalStorage, getLocalStorage } from '../../../helpers/logic';
import { Subscription } from 'rxjs';

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
    initiateTerminals: Subscription;
    formStatus = false;
    departureLabel: string;
    arrivalLabel: string;

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
        const bookingPhaseOne = getLocalStorage('bookingPhaseOne');

        this.initiateTerminals = this.ajaxService.getData('https://jibrila.herokuapp.com/api/pmt-booking/terminals')
            .subscribe((response: any) => {
                this.dataTerminals = response.payload.map(
                    // tslint:disable-next-line:no-shadowed-variable
                    (terminal: any) => ({ label: `${terminal.name}, ${terminal.city}`, value: `${terminal.id}` }
                    ));
                if (this.dataTerminals.length > 0) {
                    this.choicesFrom.setChoices(this.dataTerminals, 'value', 'label', false);
                    this.choicesTo.setChoices(this.dataTerminals, 'value', 'label', false);
                    // if (bookingPhaseOne) {
                    //     console.log(bookingPhaseOne);
                    //     this.choicesFrom.setChoiceByValue(bookingPhaseOne.travellingFrom)
                    //     this.choicesTo.setChoiceByValue(bookingPhaseOne.travellingTo)
                    //     choicesAdult.setChoiceByValue(`${bookingPhaseOne.adult}`)
                    //     this.bookingForm.get('dateDeparture').setValue(bookingPhaseOne.dateDeparture);
                    //     this.formStatus = true;
                    //     this.bookingForm.get('travellingFrom').setErrors({ 'required': false });
                    //     this.bookingForm.get('travellingTo').setErrors({ 'required': false });
                    //     this.bookingForm.get('dateDeparture').setErrors({ 'required': false });
                    //     this.bookingForm.get('adult').setErrors({ 'required': false });

                    // }
                }
            })




        travellingFrom.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.departure = (<CustomEvent>event).detail.value;
            this.departureLabel = (<CustomEvent>event).detail.label;

        }, false)
        travellingFrom.addEventListener('showDropdown', () => {
            this.bookingForm.get('travellingFrom').markAsTouched();
        }, false);

        travellingTo.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.destination = (<CustomEvent>event).detail.value;
            this.arrivalLabel = (<CustomEvent>event).detail.label;
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
        this.booking.dateBooked = this.departure;
        this.router.navigate(['bus-selection']);
        console.log(this.bookingForm);
    }

    ngOnDestroy() {
        this.initiateTerminals.unsubscribe();
        if (this.bookingForm.valid) {
            this.getBookingForm = {
                travellingFrom: this.bookingForm.value.travellingFrom,
                travellingTo: this.bookingForm.value.travellingTo,
                adult: this.bookingForm.value.adult,
                dateDeparture: this.bookingForm.value.dateDeparture,
                route: `${this.departureLabel} ==> ${this.arrivalLabel}`
            }
            setLocalStorage('bookingPhaseOne', this.getBookingForm);
        }
    }



}
