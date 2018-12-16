import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './views/main/main.component';
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { BusSelectionComponent } from './views/bus-selection/bus-selection.component';
import { PassagerDetailsComponent } from './views/passager-details/passager-details.component';
import { SuccessfulPaymantComponent } from './views/successful-paymant/successful-paymant.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { TerminalsComponent } from './views/terminals/terminals.component';

const routes: Routes = [
    // { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: '', component: MainComponent },
    { path: 'components', component: ComponentsComponent },
    { path: 'bus-selection', component: BusSelectionComponent },
    { path: 'passager-details', component: PassagerDetailsComponent },
    { path: 'successful-payment', component: SuccessfulPaymantComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'terminals', component: TerminalsComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'examples/landing', component: LandingComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
