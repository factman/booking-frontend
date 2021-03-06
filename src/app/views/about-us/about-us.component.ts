import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
    sidebarContents = [
        {
            header: 'Passengers Patronage',
            // tslint:disable-next-line:max-line-length
            content: 'Peace Mass Transit (PMT) is the No 1 choice for Travellers in Nigeria as we keep the record of conveing about 30,000 passengers daily to and fro various towns and cities in Nigeria.',
            icon: 'transportation_bus-front-12',
            color: 'info',
        },
        {
            header: 'Upholding Safety Measures',
            // tslint:disable-next-line:max-line-length
            content: 'Peace Mass Transit Ltd introduced the Speed Limiter into the Nigerian transport sector in 2009 which was commissioned at our Emene Enugu Central Workshop by the then Core Marshal of the Federal Road Safety, Chief Osita Chidoka. Our buses since then have been using the speed limiter, as we are concerned in the safety of our passengers.',
            icon: 'objects_umbrella-13',
            color: 'success',
        },
        {
            header: 'PMT as employer of Labour',
            // tslint:disable-next-line:max-line-length
            content: 'Today, Peace Mass Transit Ltd has over 3000 buses moving about 30,000 persons with about 2000 buses daily and with staff strength of over 4000.',
            icon: 'business_badge',
            color: 'warning',
        },
    ];
    columns = ((12 / this.sidebarContents.length) < 3) ? 3 : Math.floor(12 / this.sidebarContents.length);

    constructor() { }

    ngOnInit() {
    }

}
