import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/shared/interceptors/AuthInterceptor';

import { MessageService } from 'primeng/api';

import { CUSTOM_FILTER_MATCH_MODES } from '@/shared/helpers/table-custom-filters';
import { customFilterProviders } from '@/shared/helpers/table-custom-filters';

import { primeNGPtBR } from './app/shared/translation/primeNGPtBR';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideAnimationsAsync(),
        MessageService,
        { provide: 'FILTER_MATCH_MODES', useValue: CUSTOM_FILTER_MATCH_MODES },
        customFilterProviders,
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            },
            translation: primeNGPtBR
        })
    ]
};
