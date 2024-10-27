import { Component, Input, OnInit } from '@angular/core';
import { CaptureScreenService } from 'src/app/services/capture-screen.service';
import { MousePointerService, MousePosition } from 'src/app/services/mouse-pointer.service';

@Component({
  selector: 'app-capture-screen',
  templateUrl: './capture-screen.component.html',
  styleUrls: ['./capture-screen.component.css']
})
export class CaptureScreenComponent implements OnInit {

  @Input() previewMode: boolean = true;
  capturingImage: boolean = false;
  reSizing: boolean = false;
  top: number = null;
  left: number = null;
  width: number = null;
  height: number = null;
  operation: String = null;
  calcRight: number = null;
  calcBottom: number = null;
  calcTop: number = null;
  calcLeft: number = null;
  calcOffsetX: number = null;
  calcOffsetY: number = null;
  grabbing: boolean = false;
  firstRenderIsStillActive: boolean = false;

  constructor(private captureScreenService: CaptureScreenService, private mousePointerService: MousePointerService) { }

  ngOnInit(): void {
    this.mousePointerService.getCursorPosition().subscribe((e: MousePosition) => {
      if (!this.previewMode && this.reSizing) {
        console.log("mouse pointer", e)
      }
    })
  }

  async crop() {
    this.capturingImage = true;

    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    console.log("cpature", innerWidth, innerHeight);

    this.top = 100;
    this.left = 100;
    this.width = innerWidth - (2 * this.left);
    this.height = innerHeight - (2 * this.top);

  }

  onDragStart(cornerType: String, event: any) {
    if (this.operation == null) {
      this.operation = cornerType;
    }
    event.stopPropagation();
    this.grabbing = true;
    this.calcTop = this.top;
    this.calcLeft = this.left;
    this.calcRight = this.left + this.width;
    this.calcBottom = this.top + this.height;
    this.calcOffsetX = Math.abs(event.detail.clientX - this.calcLeft);
    this.calcOffsetY = Math.abs(event.detail.clientY - this.calcTop);
    // this.onDrag(cornerType, ele, event);
  }

  onDrag(cornerType: String, event: any) {
    event.stopPropagation();
    let top = this.top;
    let left = this.left;
    let width = this.width;
    let height = this.height;

    // adjust top
    switch (this.operation) {
      case "top-left":
      case "top-middle":
      case "top-right":
        top = (event.detail.clientY - this.calcBottom) > 0 ? this.calcBottom : event.detail.clientY;
        break;

      case "bottom-left":
      case "bottom-middle":
      case "bottom-right":
        top = (event.detail.clientY - this.calcTop) > 0 ? this.calcTop : event.detail.clientY;
        break;

      case "drag":
        if (!this.firstRenderIsStillActive) {
          top = event.detail.clientY - this.calcOffsetY;
        }
        break;
    }

    // adjust left
    switch (this.operation) {
      case "top-left":
      case "middle-left":
      case "bottom-left":
        left = (event.detail.clientX - this.calcRight) > 0 ? this.calcRight : event.detail.clientX;
        break;

      case "top-right":
      case "middle-right":
      case "bottom-right":
        left = (event.detail.clientX - this.calcLeft) > 0 ? this.calcLeft : event.detail.clientX;
        break;

      case "drag":
        if (!this.firstRenderIsStillActive) {
          left = event.detail.clientX - this.calcOffsetX;
        }
        break;
    }

    // adjust width
    switch (this.operation) {
      case "top-left":
      case "middle-left":
      case "bottom-left":
        width = Math.abs(event.detail.clientX - this.calcRight);
        break;

      case "top-right":
      case "middle-right":
      case "bottom-right":
        width = Math.abs(event.detail.clientX - this.calcLeft);
        break;
    }

    // adjust height
    switch (this.operation) {
      case "top-left":
      case "top-middle":
      case "top-right":
        height = Math.abs(event.detail.clientY - this.calcBottom);
        break;

      case "bottom-left":
      case "bottom-middle":
      case "bottom-right":
        height = Math.abs(event.detail.clientY - this.calcTop);
    }

    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  onDragEnd(cornerType: String, event: any) {
    event.stopPropagation();
    // this.onDrag(cornerType, ele, event);
    this.calcRight = null;
    this.calcBottom = null;
    this.calcTop = null;
    this.calcLeft = null;
    this.calcOffsetX = null;
    this.calcOffsetY = null;
    this.grabbing = false;
    this.operation = null;
  }

  async capture() {
    try {
      const imgData = await this.captureScreenService.capture(this.width, this.height, this.left, this.top);

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'draft.png';
      link.click();
      this.capturingImage = false;
    } catch (error) {
      console.error(error);
    }
  }

}
