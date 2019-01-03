import { Component } from '@angular/core';
import { ModalService } from 'app/modal.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    currentActive = 'login';
    constructor(private modalService: ModalService) { }

    public close() {
        this.modalService.destroy();
    }

    changeCurrentActive(activeBtn) {
        this.currentActive = activeBtn;
    }

}
