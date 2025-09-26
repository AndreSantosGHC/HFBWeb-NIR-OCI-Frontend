// src/shared/components/token-expired-popup/token-expired-popup.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-token-expired-popup',
    standalone: true,
    imports: [ToastModule, ButtonModule],
    providers: [MessageService],
    templateUrl: './token-expired-popup.html'
})
export class TokenExpiredPopupComponent {
    constructor(
        private router: Router,
        private messageService: MessageService
    ) {}

    onLogin(): void {
        // Remove o toast navegando para login (o toast será limpo automaticamente)
        this.messageService.clear('token-expired');
        this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url }
        });
    }
}
