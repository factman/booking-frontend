import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-notice-card',
    templateUrl: './notice-card.component.html',
    styleUrls: ['./notice-card.component.scss']
})
export class NoticeCardComponent implements OnInit {

    @Input() header: string;
    @Input() content: string;
    @Input() defaultBorderTop: boolean;
    customClass = '';

    constructor() { }

    ngOnInit() {
        this.customClass = this.defaultBorderTop === false ? ' btc-dark-blue' : '';
        console.log(this.customClass)
    }

}
