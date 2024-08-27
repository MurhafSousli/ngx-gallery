import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NoteComponent } from '../../../shared/note/note.component';
import { HlCodeComponent } from '../../../shared/hl-code/hl-code.component';
import { SectionTitleComponent } from '../../../shared/section-title/section-title.component';
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  standalone: true,
  selector: 'app-doc-lightbox',
  templateUrl: './doc-lightbox.component.html',
  styleUrls: ['./doc-lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, HlCodeComponent, MatButtonModule, RouterLink, NoteComponent, HighlightAuto]
})
export class DocLightboxComponent {

  readonly globalConfig: string = `import { LIGHTBOX_CONFIG, LightboxConfig } from 'ng-gallery/lightbox';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
        exitAnimationTime: 1000
      } as LightboxConfig
    }
  ]
})`;

}
