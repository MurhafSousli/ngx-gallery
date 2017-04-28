import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';


@Component({
  selector: 'reactive-input',
  templateUrl: './reactive-input.component.html'
})
export class ReactiveInputComponent implements OnInit {

  @Input() placeholder;
  @Input() disabled;
  @Input() text;
  @Output() value = new EventEmitter();
  @ViewChild('textBox') textBox: ElementRef;

  constructor() {
  }

  ngOnInit() {

    Observable.fromEvent(this.textBox.nativeElement, 'keyup')
      .switchMap(() => Observable.of(this.textBox.nativeElement.value))
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((text) => {
        this.value.emit(text);
      });
  }

}
