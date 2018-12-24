import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, state, animate, transition } from '@angular/animations';
import * as moment from 'moment';
import { BookingService } from 'app/views/booking.service';
import { getLocalStorage } from '../../../helpers/logic';

@Component({
    selector: 'app-schedule-bus',
    templateUrl: './schedule-bus.component.html',
    styleUrls: ['./schedule-bus.component.scss'],
    animations: [
        trigger('changeState', [
            state('fadeIn', style({
                opacity: '1',
                display: 'block',
            })),
            state('fadeOut', style({
                opacity: '0',
                display: 'none',
            })),
            transition('*=>fadeIn', animate('500ms')),
            transition('*=>fadeOut', animate('500ms'))

        ])
    ]
})
export class ScheduleBusComponent implements OnInit {
    currentState = 'fadeIn';
    @Input() scheduleBus: any;
    departureTime: any;
    busRoute: any;
    numberOfSeatBooked = 1;
    occupiedSeats = [];
    seaters: number;

    constructor(private router: Router, private booking: BookingService) { }

    ngOnInit() {
        const { departure_time, occupied_seats, seaters } = this.scheduleBus;
        this.occupiedSeats = occupied_seats ? occupied_seats.split(',').map(seat => +seat.trim()) : [];
        this.seaters = +seaters;
        this.departureTime = moment(departure_time);
        const bookingPhaseOne = getLocalStorage('bookingPhaseOne');
        if (bookingPhaseOne) {
            this.busRoute = bookingPhaseOne.route;
            this.numberOfSeatBooked = +bookingPhaseOne.adult;
        }
    }

    changeCurrentState() {
        this.currentState = this.currentState === 'fadeIn' ? 'fadeOut' : 'fadeIn';
    }

    routeToPassagerDatails() {
        this.router.navigate(['passager-details']);
    }

}
