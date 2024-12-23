import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appNameCapitalize]',
})
export class NameCapitalizeDirective implements AfterViewInit {
  #element = inject(ElementRef);
  #renderer = inject(Renderer2);

  ngAfterViewInit() {
    this.setNameCapitalize();
    console.log('hola')
  }
  setNameCapitalize() {
    const element = this.#element.nativeElement
    const text = element.value.toCapitalize(); 
    console.log(element, text)
    this.#renderer.setProperty(element, 'value', text);
  }
}
