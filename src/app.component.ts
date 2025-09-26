import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenExpiredPopupComponent } from '@/shared/components/token-expired-popup/token-expired-popup';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, TokenExpiredPopupComponent],
    template: `
        <app-token-expired-popup></app-token-expired-popup>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}
