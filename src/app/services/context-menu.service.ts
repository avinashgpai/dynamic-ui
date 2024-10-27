import { EventEmitter, Injectable } from '@angular/core';

export class ContextMenuData {
  menuSelected: String;
  contextMenuOpen: Boolean;
  mousePositionData?: any;
  display: String;
}

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  private contextMenuDataEmitter: EventEmitter<ContextMenuData> = new EventEmitter<ContextMenuData>();

  setContextMenuData(data: ContextMenuData) : void{
    this.contextMenuDataEmitter.emit(data);
  }

  getContextMenuData() : EventEmitter<ContextMenuData>{
    return this.contextMenuDataEmitter;
  }
}
