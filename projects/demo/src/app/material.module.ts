import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatChipsModule,
  MatTabsModule,
  MatGridListModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSidenavModule,
  MatChipsModule,
  MatTabsModule,
  MatGridListModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES]
})

export class MaterialModule {
}
