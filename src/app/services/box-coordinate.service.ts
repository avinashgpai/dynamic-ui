import { EventEmitter, Injectable } from '@angular/core';

export class coord {
  x: Number;
  y: Number;
}

@Injectable({
  providedIn: 'root'
})
export class BoxCoordinateService {

  private boxCoord: coord[] = [];
  private boxCoordinatesDataEmitter: EventEmitter<coord[]> = new EventEmitter<coord[]>();
  
  constructor() { }

  setBoxCoordinatesData(data: coord[]){
    this.boxCoord = data;
    this.boxCoordinatesDataEmitter.emit(this.boxCoord);
  }

  getBoxCoordinatesData() : EventEmitter<coord[]>{
    return this.boxCoordinatesDataEmitter;
  }

  getBoxCoord(): coord[]{
    return this.boxCoord;
  }
}
