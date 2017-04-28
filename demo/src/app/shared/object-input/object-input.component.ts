import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'object-input',
  templateUrl: './object-input.component.html',
  styleUrls: ['./object-input.component.scss']
})
export class ObjectInputComponent {

  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() data = {};
  @Output() value = new EventEmitter();
  newEntry: any = {};

  addEntry() {
    if (this.newEntry.key !== undefined && this.newEntry.value !== undefined) {

      const entry = {[this.newEntry.key]: this.newEntry.value};
      this.data = Object.assign({}, this.data, entry);
      this.value.emit(this.data);
      this.newEntry = {};
    }
  }

  removeEntry(key) {
    delete this.data[key];
    this.data = Object.assign({}, this.data);
    this.value.emit(this.data);
  }

  keyChanged(entry, newKey) {
    delete this.data[entry.key];
    const changedEntry = {[newKey]: entry.value};
    this.data = Object.assign({}, this.data, changedEntry);
    this.value.emit(this.data);
  }

  valueChanged(entry, newValue) {
    this.data[entry.key] = newValue;
    this.data = Object.assign({}, this.data);
    this.value.emit(this.data);
  }

}
