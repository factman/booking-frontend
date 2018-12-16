import { Component, OnInit } from '@angular/core';
import { DataTerminalService } from './data-terminal.service';
import Choices from 'choices.js';

@Component({
    selector: 'app-terminals',
    templateUrl: './terminals.component.html',
    styleUrls: ['./terminals.component.scss'],
    providers: [DataTerminalService],
})
export class TerminalsComponent implements OnInit {
    dataTerminals: {}[];
    searchTerminals: {}[];
    collections: number;
    page = 1;
    pageSize = 10;
    startPoint = 0;
    endpoint = 10;
    currentOrder = false;
    search = '';
    constructor(
        private terminals: DataTerminalService
    ) { }

    ngOnInit() {
        this.dataTerminals = this.terminals.terminals.slice(this.startPoint, this.endpoint);
        this.collections = this.terminals.terminals.length;
        this.initialDeclaration();
    }

    initialDeclaration() {
        const terminalPerPage = document.getElementById('terminalPerPage');
        const perPageChoice = new Choices(terminalPerPage, {
            shouldSort: false
        });
        perPageChoice.setChoiceByValue('10');

        terminalPerPage.addEventListener('addItem', (event) => {
            // do something creative here...
            const perRecord = +(<CustomEvent>event).detail.value;
            this.pageSize = perRecord === 0 ? this.collections : perRecord;
            this.onPageChange(this.page);
        }, false);
    }

    onPageChange(event) {
        this.startPoint = (event - 1) * this.pageSize;
        this.endpoint = event * this.pageSize;
        if (this.search !== '') {
            this.dataTerminals = this.searchTerminals.slice(this.startPoint, this.endpoint);
        } else {
            this.dataTerminals = this.terminals.terminals.slice(this.startPoint, this.endpoint);
        }
    }

    orderByItem(item: string) {
        this.dataTerminals = this.dataTerminals.sort((a, b) => {
            const x = a[item].toLowerCase();
            const y = b[item].toLowerCase();
            if (this.currentOrder) {
                if (x < y) { return -1; }
                if (x > y) { return 1; }
            } else {
                if (x < y) { return 1; }
                if (x > y) { return -1; }
            }
            return 0;
        });
        this.currentOrder = !this.currentOrder;
    }

    updateValue(event) {
        this.search = event.target.value.toLocaleLowerCase();
        this.searchTerminals = this.terminals.terminals.filter((data) => (
            data.address.toLocaleLowerCase().includes(this.search)
            || data.manager.toLocaleLowerCase().includes(this.search)
            || data.name.toLocaleLowerCase().includes(this.search)
            || data.phone.toLocaleLowerCase().includes(this.search)
        )
        );
        this.collections = this.searchTerminals.length;
        this.onPageChange(this.page);
    }

}
