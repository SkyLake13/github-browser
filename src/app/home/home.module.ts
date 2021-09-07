import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { NavigatorRoutingModule } from "./home-routing.module";
import { NavigatorComponent } from "./home.component";

@NgModule({
    declarations: [NavigatorComponent],
    imports: [
        CommonModule,
        NavigatorRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule
    ]
})
export class HomeModule { }