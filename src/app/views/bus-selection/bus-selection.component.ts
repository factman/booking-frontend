import { Component, OnInit, OnDestroy } from '@angular/core';
import { AjaxService } from 'app/ajax.service';
import { Response } from '@angular/http';
import { getLocalStorage, getStringDate } from '../../helpers/logic';

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
        const { dateDeparture, travellingFrom, travellingTo } = getLocalStorage('bookingPhaseOne');
        this.ajaxService.getData(
            // tslint:disable-next-line:max-line-length
            'https://jibrila.herokuapp.com/api/pmt-booking/schedules?departure_time=2018-12-25&terminal1_id=15&terminal2_id=33&seat_quantity=2'
            // `https://jibrila.herokuapp.com/api/pmt-booking/schedules?departure_time=${getStringDate(dateDeparture)}&terminal1_id=${travellingFrom}&terminal2_id=${travellingTo}`
        )
            .subscribe(
                (response: Response) => console.log(response),
                (error) => console.log(error))
    }

    ngOnDestroy() {
    }

}
