import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  githubIcon = faGithub;
  @Input() toolbar = true;
}
