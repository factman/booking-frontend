import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-schedule-bus',
    templateUrl: './schedule-bus.component.html',
    styleUrls: ['./schedule-bus.component.scss'],
    animations: [
        trigger('changeState', [
            state('fadeIn', style({
                opacity: '1',
                display: 'block'
            })),
            state('fadeOut', style({
                opacity: '0',
                display: 'none'
            })),
            transition('*=>fadeIn', animate('500ms')),
            transition('*=>fadeOut', animate('500ms'))

        ])
    ]
})
export class ScheduleBusComponent implements OnInit {
    currentState = 'fadeIn';

    constructor() { }

    ngOnInit() {
    }

    changeCurrentState() {
        this.currentState = this.currentState === 'fadeIn' ? 'fadeOut' : 'fadeIn';
        console.log(this.currentState);
    }

}
