import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { progressInterceptor } from 'ngx-progressbar/http';
import { provideNgProgressRouter } from 'ngx-progressbar/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNgProgressRouter({
      minDuration: 600
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([progressInterceptor])
    )
  ]
};
