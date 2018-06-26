import {ChangeDetectionStrategy, Component} from '@angular/core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  twitterIcon = faTwitter;
  githubIcon = faGithub;
}
