import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: NotFoundComponent }
        ]),
        NotFoundComponent
    ]
})
export class NotFoundPageModule {
}
