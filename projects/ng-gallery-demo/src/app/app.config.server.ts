import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

const serverConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([FlexLayoutServerModule]),
    provideServerRendering()
  ],
};

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, serverConfig);
