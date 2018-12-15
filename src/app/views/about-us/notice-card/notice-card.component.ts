import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-notice-card',
    templateUrl: './notice-card.component.html',
    styleUrls: ['./notice-card.component.scss']
})
export class NoticeCardComponent implements OnInit {

    @Input() header: string;
    @Input() content: string;

    constructor() { }

    ngOnInit() {
    }

}
