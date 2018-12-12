import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-seats',
    templateUrl: './seats.component.html',
    styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {
    seatNumberSet = new Set();
    @Output() seatEvent = new EventEmitter<{}>();
    @Input() numberOfSeat: Number = 1;
    currentSeat: string;
    constructor() { }

    ngOnInit() {
    }

    getSeatNumber(event) {
        this.currentSeat = event.target.innerText.trim();
        const currentSeatSelector = document.querySelector('[data-seat="' + this.currentSeat + '"]');
        if ((this.seatNumberSet.size < this.numberOfSeat) || currentSeatSelector.className.includes('active')) {
            this.seatNumberSet.add(this.currentSeat);
            this.crossBrowserToggleClass(currentSeatSelector, 'active');
        }
    }

    crossBrowserToggleClass(element, classString) {
        if (element.classList) {
            element.classList.toggle(classString);
            if (!element.className.includes('active')) {
                this.seatNumberSet.delete(this.currentSeat);
            }
            this.seatEvent.emit(this.seatNumberSet);
        } else {
            // For IE9
            const classes = element.className.split(' ');
            const i = classes.indexOf(' ' + classString);

            if (i >= 0) {
                classes.splice(i, 1);
            } else {
                classes.push(classString);
            }
            element.className = classes.join(' ');
        }
    }

}
