import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import 'rxjs/add/operator/filter';
import { ModalService } from './modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    listener: any;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(
        private router: Router,
        private modalService: ModalService,
        public location: Location
    ) { }
    ngOnInit() {
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }

            this.navbar.sidebarClose();
        });
    }
    removeModal() {
        this.modalService.destroy();
    }
}
