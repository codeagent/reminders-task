import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor as Interceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpInterceptor implements Interceptor {

  constructor(private storage: StorageService, private snakbar: MatSnackBar) {
  }

  // Show http errors
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(_ => {}, error => {
        this.snakbar.open(`There was http error [${error.status}]`, 'CLOSE', {
          duration: 5000
        });
      })
    );
  }
}
