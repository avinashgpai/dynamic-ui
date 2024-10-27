import { EventEmitter, Injectable } from '@angular/core';

export class KeyBoardPressData{
  keyCode: any;
  xCoord: Number;
  yCoord: Number;
  event: String;
}

export class KeyPressedDataList{
  keyList: any;
  xCoord: Number;
  yCoord: Number;
}

@Injectable({
  providedIn: 'root'
})
export class KeyPressService {

  private keyPressedData: KeyPressedDataList = {
    keyList: {},
    xCoord: null,
    yCoord: null
  }

  private keyPressedDataEmiiter: EventEmitter<KeyPressedDataList> = new EventEmitter<KeyPressedDataList>();

  setKeyPressedData(data: KeyBoardPressData) : void{
    if(data.event == "keyDown"){
      let keyList = this.keyPressedData.keyList;
      keyList[data.keyCode] = true;

      this.keyPressedData = {
        "keyList" : keyList,
        "xCoord": data.xCoord,
        "yCoord": data.yCoord
      }
    }else if(data.event == "keyUp"){
      delete this.keyPressedData.keyList[data.keyCode];
    }

    this.keyPressedDataEmiiter.emit(this.keyPressedData);
  }

  getKeyPressedData() : EventEmitter<KeyPressedDataList>{
    return this.keyPressedDataEmiiter;
  }

  setKeyPressedDataList(data: KeyPressedDataList){
    this.keyPressedData = data;
  }
}
