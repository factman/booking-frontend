import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appDataTarget]'
})
export class DataTargetDirective implements OnInit {
    @Input() dataTarget: string;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.getDataTarget(this.dataTarget);
    }

    getDataTarget(id: string) {
        this.el.nativeElement.setAttribute('data-target', `#${id}`)
    }

}
