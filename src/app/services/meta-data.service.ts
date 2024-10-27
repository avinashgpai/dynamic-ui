import { EventEmitter, Injectable } from '@angular/core';

export class MetaData{
  id: String;
  type: String;
  display: String;
  style?: Style;
  parent?: String;
  children?: MetaData[];
  staticLabel?: String;
  placeholder?: String;
  metaData?: String[];
  status?: String;
  icon?: String;
  url?: String; 
}

export class Style{
  position?: String;
  top?: Number;
  left?: Number;
  bottom?: Number;
  right?: Number;
  width?: Number;
  height?: Number;
  backGroundColorType?: String;
  backGroundColor?: String;
  linearGradientDirectionType: String;
  linearGradientDirection: String;
  fromBackgroundColor?: String;
  toBackgroundColor?: String;
  textColor?: String;
  fontSize?: number;
  gridColumnCount?: number;
  gridRowCount?: number;
  gridGap?: number;
  gridCellColor?: String;
  gridLinearGradientDirectionType?: String;
  gridLinearGradientDirection?: String;
  gridFromBackgroundColor?: String;
  gridToBackgroundColor?: String;
  gridCellColorType?: String;
  borderStyle?: String;
  borderWidth?: number;
  borderColor?: String;
  borderRadiusType?: String; 
  borderRadius?: String;
}

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {

  private metaDataConfig: MetaData[] = [];
  private activeMetaDataConfigOnHover: MetaData = null;
  private activeMetaDataOnEdit: MetaData = null;
  private metaDataEmitter: EventEmitter<MetaData[]> = new EventEmitter<MetaData[]>();
  private activeEditMetaDataEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  setMetaData(data: MetaData) : void{
    data.id = data.type + "-" +(this.metaDataConfig.reduce((a, b: MetaData)=>{ return a + (b.type == data.type ? 1 : 0)}, 0) + 1).toString();
    data.children = [];
    data.staticLabel = data.id.charAt(0).toUpperCase() + data.id.slice(1);
    this.metaDataConfig.push(data);
    // if(data?.parent){
    //   this.metaDataConfig.find((e)=> e.id == data.parent).metaData.push(data.id);
    // } 
    this.metaDataEmitter.emit(this.metaDataConfig);
  }

  getMetaData(): EventEmitter<MetaData[]>{
    return this.metaDataEmitter;
  }

  getMetaDataConfig(): MetaData[]{
    return this.metaDataConfig;
  }

  setMetaDataConfig(data: MetaData[]): void{
    this.metaDataConfig = data;
    this.metaDataEmitter.emit(this.metaDataConfig);
  }

  setActiveMetaDataOnHover(data: MetaData): void{
    this.activeMetaDataConfigOnHover = data;
  }

  getActiveMetaDataOnHover(): MetaData{
    return this.activeMetaDataConfigOnHover;
  }

  setActiveMetaDataOnEdit(data: MetaData, index: number): void{
    this.activeMetaDataOnEdit = data;
    this.activeEditMetaDataEmitter.emit({"metaData": this.activeMetaDataOnEdit, "index": index});
  }

  getActiveMetaDataEdit(): EventEmitter<any>{
    return this.activeEditMetaDataEmitter;
  }
}
