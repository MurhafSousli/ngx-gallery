import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SharedService} from '../../shared/service/shared.service';

@Component({
  selector: 'documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent {

  constructor(public shared: SharedService) {
  }

}
