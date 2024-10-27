import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective implements OnChanges{

  @Input() previewMode : boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if(this.previewMode){
      event.preventDefault();
      event.stopPropagation();
      this.triggerEvent('dragstart', event);
  
      const onMouseMove = (moveEvent: MouseEvent) => {
        this.triggerEvent('drag', moveEvent);
      };
  
      const onMouseUp = (upEvent: MouseEvent) => {
        this.triggerEvent('dragend', upEvent);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  private triggerEvent(type: string, originalEvent: MouseEvent) {
    const event = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
      detail: {
        clientX: originalEvent.clientX,
        clientY: originalEvent.clientY,
        originalEvent: originalEvent
      }
    });
    this.el.nativeElement.dispatchEvent(event);
  }

}
