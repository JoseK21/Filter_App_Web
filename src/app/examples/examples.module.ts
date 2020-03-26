import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';

import { LoginComponent } from './login/login.component';
import { ExamplesComponent } from './examples.component';


// Import library module
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        }),
        NgxSpinnerModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        LoginComponent,
        ExamplesComponent,
    ]
})
export class ExamplesModule { }
