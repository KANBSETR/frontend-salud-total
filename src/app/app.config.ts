import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// PrimeNG
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Configuracion de las rutas esto asegura que las rutas de app.routes.ts esten disponibles
    provideHttpClient(), // Proporciona el cliente HTTP para realizar solicitudes
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    })

  ]
};

