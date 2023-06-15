import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FlexModule, FooterComponent]
})
export class NotFoundComponent implements OnInit {

  constructor(private _title: Title) {
  }

  ngOnInit() {
    this._title.setTitle('404 | ng-gallery');
  }

}
