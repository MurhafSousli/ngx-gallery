import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'note',
  template: `
    <section>
        <span class="note-icon">
          <mat-icon>error_outline</mat-icon>
        </span>
      <div class="note-content">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styleUrl: './note.component.scss',
  imports: [MatIconModule]
})
export class NoteComponent {

}
