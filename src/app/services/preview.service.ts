import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  private previewMode: boolean = true;

  private previewModeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  setPreviewMode(value: boolean) : void{
    this.previewMode = value;
    this.previewModeEmitter.emit(this.previewMode);
  }

  getPreviewMode() : EventEmitter<boolean>{
    return this.previewModeEmitter;
  }

  getCurrentPreviewMode(): boolean{
    return this.previewMode
  }
}
