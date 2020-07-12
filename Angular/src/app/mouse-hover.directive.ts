import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouseHover]',
  exportAs: 'mouseHover'
})
export class MouseHoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'cursor', 'pointer');
  }

  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background', '#343a40');
  }

  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'background', '');
  }
}
