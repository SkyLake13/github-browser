import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, 
    HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly dialogService: DialogService) { }
  public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest)
            .pipe(catchError((err: HttpErrorResponse) => {
                this.dialogService.showHttpErrorDialog(err.status, err.message);
                return throwError(err);
            }));
  }
}