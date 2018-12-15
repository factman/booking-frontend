import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { BookingService } from 'app/views/booking.service';

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

    constructor(private router: Router, private booking: BookingService) { }

    ngOnInit() {
    }

    changeCurrentState() {
        this.currentState = this.currentState === 'fadeIn' ? 'fadeOut' : 'fadeIn';
    }

    routeToPassagerDatails() {
        this.router.navigate(['passager-details']);
    }

}
