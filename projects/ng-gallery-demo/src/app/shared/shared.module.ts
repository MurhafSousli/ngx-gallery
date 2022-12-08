import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { ClipboardModule} from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightModule } from 'ngx-highlightjs';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../material.module';

import { KeysPipe } from './pipes/keys.pipe';
import { BadgesComponent } from './badges/badges.component';

import { FooterComponent } from './footer/footer.component';
import { HlCodeComponent } from './hl-code/hl-code.component';
import { MenuComponent } from './menu/menu.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [
    SectionTitleComponent,
    BadgesComponent,
    NoteComponent,
    MenuComponent,
    FooterComponent,
    HlCodeComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ObserversModule,
    MaterialModule,
    HighlightModule,
    PlatformModule,
    FlexLayoutModule,
    NgScrollbarModule,
    FontAwesomeModule,
    ClipboardModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HighlightModule,
    MaterialModule,
    ObserversModule,
    FlexLayoutModule,
    NgScrollbarModule,
    FontAwesomeModule,
    SectionTitleComponent,
    HlCodeComponent,
    MenuComponent,
    FooterComponent,
    BadgesComponent,
    NoteComponent,
    ClipboardModule,
  ]
})
export class SharedModule {
}
