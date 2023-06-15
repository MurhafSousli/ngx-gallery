import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { SharedModule } from '../../shared/shared.module';
import { LightboxExampleComponent } from './lightbox-example.component';

@NgModule({
    imports: [
        SharedModule,
        GalleryModule,
        LightboxModule.withConfig({
            keyboardShortcuts: false
        }),
        RouterModule.forChild([
            {
                path: '', component: LightboxExampleComponent
            }
        ]),
        LightboxExampleComponent
    ]
})
export class LightboxExampleModule {
}
