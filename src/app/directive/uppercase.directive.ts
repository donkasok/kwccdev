

import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[Uppercase]',
  // host: {
  //   '[value]': 'uppercase',
  //   '(input)': 'format($event.target.value)'
  // }
})
export class UppercaseDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {
    this.value = $event.target.value.toUpperCase();
    this.ngModelChange.emit(this.value);
  }

}