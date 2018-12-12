import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
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
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        MainModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
