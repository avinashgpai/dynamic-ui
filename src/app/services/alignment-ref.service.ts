import { EventEmitter, Injectable } from '@angular/core';

export class RefCoordinates{
  top:RefData;
  right:RefData;
  bottom:RefData;
  left:RefData;
}

export class RefData{
  top?: Number;
  left?: Number;
  width?: Number;
  height?: Number;
}

@Injectable({
  providedIn: 'root'
})
export class AlignmentRefService {

  private refCoordEmitter: EventEmitter<RefCoordinates> = new EventEmitter<RefCoordinates>();

  constructor() { }

  setRefCoordinate(data: any) : void{
    this.refCoordEmitter.emit(data);
  }

  getRefCoordinate() : EventEmitter<RefCoordinates>{
    return this.refCoordEmitter;
  }
}
