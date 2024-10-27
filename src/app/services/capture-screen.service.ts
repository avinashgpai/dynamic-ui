import { ElementRef, Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class CaptureScreenService {
  private captureElement: ElementRef;

  setCaptureElement(element: ElementRef) {
    this.captureElement = element;
  }

  async capture(width: number, height: number, left: number, top: number): Promise<string> {
    if (!this.captureElement) {
      throw new Error('Capture element is not set.');
    }

    const element = this.captureElement.nativeElement;

    // Use html2canvas to capture the element as a canvas
    const canvas = await html2canvas(element, {
      width: width,
      height: height,
      x: left,
      y: top,
      scrollX: 0,
      scrollY: 0
    });

    // Convert the canvas to a base64-encoded image
    return canvas.toDataURL('image/png');
  }

}
