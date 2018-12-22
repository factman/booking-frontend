import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { MainModule } from './views/main/main.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BusSelectionComponent } from './views/bus-selection/bus-selection.component';
import { PassagerDetailsComponent } from './views/passager-details/passager-details.component';
import { SuccessfulPaymantComponent } from './views/successful-paymant/successful-paymant.component';
import { ScheduleBusComponent } from './views/bus-selection/schedule-bus/schedule-bus.component';
import { SeatsComponent } from './views/bus-selection/schedule-bus/seats/seats.component';
import { BookingService } from './views/booking.service';
import { DataTargetDirective } from './views/data-target.directive';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { NoticeCardComponent } from './views/about-us/notice-card/notice-card.component';
import { TerminalsComponent } from './views/terminals/terminals.component';
import { VerifyBookingComponent } from './views/verify-booking/verify-booking.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
<<<<<<< HEAD
import { AjaxService } from './ajax.service';
=======
import { PartnersComponent } from './views/about-us/partners/partners.component';
<<<<<<< HEAD
>>>>>>> b5e2b1eb0780f50ec761e328726628b821652e87
=======
import { LoginModalComponent } from './views/login-modal/login-modal.component';
>>>>>>> 59370cff7743680d9fe280a58e8048b6518e5caa

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        BusSelectionComponent,
        SeatsComponent,
        PassagerDetailsComponent,
        SuccessfulPaymantComponent,
        ScheduleBusComponent,
        DataTargetDirective,
        AboutUsComponent,
        NoticeCardComponent,
        TerminalsComponent,
        VerifyBookingComponent,
        ContactUsComponent,
        PartnersComponent,
        LoginModalComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        // RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        MainModule,
        HttpModule,
    ],
    providers: [
        BookingService,
        AjaxService,
    ],
    bootstrap: [
        AppComponent,
    ],

})
export class AppModule { }
