import {
    Component,
    OnInit
} from '@angular/core';
import {
    ModalService
} from 'app/modal.service';
import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { AjaxService } from 'app/ajax.service';
import Choices from 'choices.js';
// import * as country from 'country-list';
// import PerfectScrollbar from 'perfect-scrollbar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    currentActive = 'login';
    loginForm: FormGroup;
    registerForm: FormGroup;
    // countries = country.getNames();
    constructor(private modalService: ModalService, private ajaxService: AjaxService) {}

    public close() {
        this.modalService.destroy();
    }

    ngOnInit() {
        this.initialSelectFields();
    }

    initialSelectFields() {
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [this.emailValidation]),
            'password': new FormControl(null, [Validators.required]),
            'phone': new FormControl(null, [Validators.required]),
            'otp': new FormControl(null, [Validators.required])
        });

        this.registerForm = new FormGroup({
            'surname': new FormControl(null, [Validators.required]),
            'other_name': new FormControl(null, [Validators.required]),
            'phone': new FormControl(null, [Validators.required]),
            'gender': new FormControl(null, [Validators.required]),
            'country_iso2': new FormControl(null, [Validators.required]),
            'customer_type': new FormControl(null, [Validators.required]),
            'phone2': new FormControl(null),
            'email': new FormControl(null, [this.emailValidation]),
            'password': new FormControl(null, [Validators.required]),
            'confirm_password': new FormControl(null, [Validators.required, this.passwordConfirmation]),
            'contact_person': new FormControl(null, [Validators.required]),
            'contact_person_phone': new FormControl(null, [Validators.required]),
        });

        const customer_type = document.getElementById('customer_type');
        if (customer_type) {
            // tslint:disable-next-line:no-unused-expression
            new Choices(customer_type);
        }
        const gender = document.getElementById('gender');
        if (gender) {
            // tslint:disable-next-line:no-unused-expression
            new Choices(gender);
        }

        const country_iso2 = document.getElementById('country_iso2');
        if (country_iso2) {
            const choiceCountry = new Choices(country_iso2);
            // let countriesLists = [];
            Promise.all(
                ['Nigeria', 'Others'].map( async item => {
                   const res = await {label: item, value: item.toLowerCase()}
                   return res;
                })
            ).then(result => {
                // countriesLists = result;
                choiceCountry.setChoices(result, 'value', 'label', false);
            });
        }
    }

    changeCurrentActive(activeBtn) {
        this.currentActive = activeBtn;
    }

    passwordConfirmation = (control: FormControl): {
        [s: string]: boolean
    } => {
        if (this.registerForm !== undefined && this.registerForm.value.password !== control.value) {
            return {
                'passwordConfirmation': true
            }
        }
        return null;
    }

    emailValidation = (control: FormControl): {
        [s: string]: boolean
    } => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) === false) {
            return {
                'emailValidation': true
            }
        }
        return null;
    }

    onSubmitRegister() {
        if (this.registerForm.valid) {
            this.ajaxService.postData(
                'https://jibrila.herokuapp.com/api/customers',
                this.registerForm.value
            )
            .subscribe((response: any) => {
                console.log(response);
            })
        }
    }

    onSubmitLogin() {
        // if () {

        // }
    }

}
