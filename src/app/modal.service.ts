import { Injectable } from '@angular/core';
import { DomService } from './dom.service';

@Injectable()
export class ModalService {

    private modalElementId = 'modal-container';
    private overlayElementId = 'overlay';
    overLayZIndex = -1;
    modalZIndex = -1;
    constructor(private domService: DomService) { }


    init(component: any, inputs: object, outputs: object) {
        if (document.getElementById(this.modalElementId).className === 'hidden') {
            const componentConfig = {
                inputs: inputs,
                outputs: outputs
            }
            this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
            document.getElementById(this.modalElementId).className = 'show';
            document.getElementById(this.overlayElementId).className = 'show';
            this.overLayZIndex = 1500;
            this.modalZIndex = 1600;
        }
    }

    destroy() {
        if (document.getElementById(this.modalElementId).className === 'show') {
            this.domService.removeComponent();
            document.getElementById(this.modalElementId).className = 'hidden';
            document.getElementById(this.overlayElementId).className = 'hidden';
            this.overLayZIndex = -1;
            this.modalZIndex = -1;
        }
    }
}
