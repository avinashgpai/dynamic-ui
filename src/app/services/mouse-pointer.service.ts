import { EventEmitter, Injectable } from '@angular/core';

export class MousePosition{
  xCoortinate: number;
  yCoortinate: number;
}

@Injectable({
  providedIn: 'root'
})
export class MousePointerService {
  
  private position: MousePosition = new MousePosition();
  private cursorPositionEmitter: EventEmitter<MousePosition> = new EventEmitter<MousePosition>();

  constructor() { }

  setCursorPosition(xCoortinate: number, yCoortinate: number) : void{
    this.position.xCoortinate = xCoortinate;
    this.position.yCoortinate = yCoortinate;

    this.cursorPositionEmitter.emit(this.position);
  }

  getCursorPosition() : EventEmitter<MousePosition>{
    return this.cursorPositionEmitter;
  }

  getMousePointer(): MousePosition{
    return this.position;
  }
}
