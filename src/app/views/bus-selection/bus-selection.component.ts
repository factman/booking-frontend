import { Component, OnInit, OnDestroy } from '@angular/core';
import { AjaxService } from 'app/ajax.service';
import { Response } from '@angular/http';

@Component({
    selector: 'app-bus-selection',
    templateUrl: './bus-selection.component.html',
    styleUrls: ['./bus-selection.component.scss']
})
export class BusSelectionComponent implements OnInit, OnDestroy {
    schedules: any[];
    primaryColor: string;
    constructor(private ajaxService: AjaxService) {
    }

    ngOnInit() {
        this.ajaxService.getData(
            'https://jibrila.herokuapp.com/api/pmt-booking/schedules?departure_time=2018-12-25&terminal1_id=4&terminal2_id=7'
        )
            .subscribe(
                (response: Response) => console.log(response),
                (error) => console.log(error))
    }

    ngOnDestroy() {
    }

}
