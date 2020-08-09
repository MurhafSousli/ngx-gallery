import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

const MATERIAL_MODULES = [
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSidenavModule,
  MatChipsModule,
  MatTabsModule,
  MatGridListModule,
  MatSelectModule,
  MatCardModule,
  MatCheckboxModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES]
})

export class MaterialModule {
}
