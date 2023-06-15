import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HighlightModule } from 'ngx-highlightjs';
import { NoteComponent } from '../../../shared/note/note.component';
import { HlCodeComponent } from '../../../shared/hl-code/hl-code.component';
import { SectionTitleComponent } from '../../../shared/section-title/section-title.component';

@Component({
  selector: 'app-doc-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doc-lightbox.component.html',
  styleUrls: ['./doc-lightbox.component.scss'],
  standalone: true,
  imports: [SectionTitleComponent, HlCodeComponent, HighlightModule, MatButtonModule, RouterLink, NoteComponent]
})
export class DocLightboxComponent {

  docs = `import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule
  ]
})`;

  docsWithConfig = `import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule.withConfig({ ... })
  ]
})`;

  globalConfig = `import { LIGHTBOX_CONFIG } from 'ng-gallery/lightbox';

@NgModule({
  providers: [
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false
      }
    }
  ]
})
export class AppModule { }`;

}
