import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import { NavigatorRoutingModule } from "./navigator-routing.module";
import { NavigatorComponent } from "./navigator.component";

@NgModule({
    declarations: [NavigatorComponent],
    imports: [
        CommonModule,
        NavigatorRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule
    ]
})
export class NavigatorModule { }