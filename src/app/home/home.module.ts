import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { NavigatorRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        NavigatorRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule
    ]
})
export class HomeModule { }