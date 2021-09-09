import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';

import { DialogComponent } from "./dialog/dialog.component";
import { HttpErrorInterceptor } from "./interceptor/http-error.interceptor";
import { DialogService } from "./services/dialog.service";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule
    ],
    declarations: [DialogComponent],
    exports: [DialogComponent],
    entryComponents: [DialogComponent]
})
export class ErrorHandlingModule {
    public static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
        return {
            ngModule: ErrorHandlingModule,
            providers: [
                DialogService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpErrorInterceptor,
                    multi: true
                }
            ]
        }
    }
}