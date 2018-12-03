import { Component, OnInit } from '@angular/core';
import Choices from 'choices.js';
import { Booking } from './booking.model';
import { CustomDate } from './customdate.model'

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
    public booking: Booking;
    public departure: CustomDate;
    public arrival: CustomDate;
    public arrivalStatus: boolean;
    constructor() {
        this.booking = new Booking();
        this.arrivalStatus = false
        this.departure = new CustomDate();
        this.arrival = new CustomDate();
    }

    ngOnInit() {
        this.initialSelectFields();
        this.onClickTripType();
    }

    initialSelectFields() {
        const travellingFrom = document.getElementById('travellingFrom');
        const travellingTo = document.getElementById('travellingTo');
        const adult = document.getElementById('adult');
        const choicesFrom = new Choices(travellingFrom);
        const choicesAdult = new Choices(adult);
        const choicesTo = new Choices(travellingTo, {
            choices: [
                { value: 'One', label: 'Label One' },
                { value: 'Two', label: 'Label Two' },
                { value: 'Three', label: 'Label Three' },
            ],
        });


        travellingFrom.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.destinationFrom = (<CustomEvent>event).detail.value;

        }, false);

        travellingTo.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.destinationTo = (<CustomEvent>event).detail.value;
        }, false);

        adult.addEventListener('addItem', (event) => {
            // do something creative here...
            this.booking.adult = parseInt((<CustomEvent>event).detail.value, 10);
        }, false);
    }

    onClickTripType() {
        const trips = document.querySelectorAll('.trip');
        (<any>trips).forEach(trip => {
            (<HTMLElement>trip).addEventListener('click', (e) => {
                const currentTrip = (<HTMLElement>e.target);
                this.booking.trip = currentTrip.textContent;
                this.arrivalStatus = currentTrip.textContent.toLowerCase() === 'round trip';
                currentTrip.classList.add('active');
                if (currentTrip.nextElementSibling) {
                    (<HTMLElement>currentTrip.nextElementSibling).classList.remove('active');
                } else {
                    (<HTMLElement>currentTrip.previousElementSibling).classList.remove('active');
                }
            })
        })
    }

    onSubmit() {
        if (this.departure.year !== null) {
            this.booking.departureDate = `${this.departure.year}-${this.departure.month}-${this.departure.day}`
        }

        if (
            this.booking.trip !== null
            && this.booking.trip.toLowerCase() === 'round trip'
            && this.arrival.year !== null) {
            this.booking.arrivalDate = `${this.arrival.year}-${this.arrival.month}-${this.arrival.day}`
        } else {
            this.booking.arrivalDate = null;
        }
    }



}
