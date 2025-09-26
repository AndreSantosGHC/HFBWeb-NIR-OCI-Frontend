import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor( private authService: AuthService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('auth_token');

        if (token) {
            const cloned = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });

            return next.handle(cloned).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.handleUnauthorizedError(error);
                }
                return throwError(() => error);
            })
        );
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.handleUnauthorizedError(error);
                }
                return throwError(() => error);
            })
        );
    }

    private handleUnauthorizedError(error: HttpErrorResponse): void {
        this.authService.handleAuthError(error);
    }
}
