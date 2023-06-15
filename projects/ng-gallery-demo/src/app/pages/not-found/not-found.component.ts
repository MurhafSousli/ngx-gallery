import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FlexLayoutModule, FooterComponent]
})
export class NotFoundComponent implements OnInit {

  constructor(private _title: Title) {
  }

  ngOnInit() {
    this._title.setTitle('404 | ng-gallery');
  }

}
