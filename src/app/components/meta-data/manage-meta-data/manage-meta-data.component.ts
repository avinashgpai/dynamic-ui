import { Component, Input, OnInit } from '@angular/core';
import { BoxCoordinateService, coord } from 'src/app/services/box-coordinate.service';
import { MetaData, MetaDataService } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-manage-meta-data',
  templateUrl: './manage-meta-data.component.html',
  styleUrls: ['./manage-meta-data.component.css']
})
export class ManageMetaDataComponent implements OnInit {

  @Input() metaData: MetaData = null;
  top: String = "";
  left: String = "";
  yQuadrant: 1 | -1 = 1;
  xQuadrant: 1 | -1 = 1;
  calcRight: number = null;
  calcBottom: number = null;
  calcTop: number = null;
  calcLeft: number = null;
  calcOffsetX: number = null;
  calcOffsetY: number = null;
  grabbing: boolean = false;
  firstRenderIsStillActive: boolean = false;
  operation: String = null;
  activeMetaData: MetaData = null;
  @Input()previewMode: boolean = false;
  @Input()indexOfMetaData: number = -1;


  constructor(private metaDataService: MetaDataService, private boxCoordinateService: BoxCoordinateService) { }

  ngOnInit(): void {

    this.boxCoordinateService.getBoxCoordinatesData().subscribe((data: coord[]) => {
      if (data.length == 2) {
        this.firstRenderIsStillActive = true;
      } else {
        this.firstRenderIsStillActive = false;
      }
    })
  }

  delete(ele: MetaData) {
    let metaDataConfig = this.metaDataService.getMetaDataConfig();
    let index = metaDataConfig.findIndex((e) => e.id == ele.id);
    metaDataConfig.splice(index, 1);
    this.metaDataService.setMetaDataConfig(metaDataConfig);
    this.metaDataService.setActiveMetaDataOnEdit(null, null);
  }

  update(ele: MetaData) {
    this.metaDataService.setActiveMetaDataOnEdit(ele, this.indexOfMetaData);
  }

  close(ele: MetaData) {
    let metaDataConfig = this.metaDataService.getMetaDataConfig();
    metaDataConfig.map((e) => {
      if (e.id == ele.id) {
        e.status = "idle";
        ele.status = "idle"
      }
    });
    this.metaDataService.setMetaDataConfig(metaDataConfig);
  }

  onDragStart(cornerType: String, ele: MetaData, event: any) {
    if (this.operation == null) {
      this.operation = cornerType;
    }
    event.stopPropagation();
    this.grabbing = true;
    this.calcTop = ele.style.top.valueOf();
    this.calcLeft = ele.style.left.valueOf();
    this.calcRight = ele.style.left.valueOf() + ele.style.width.valueOf();
    this.calcBottom = ele.style.top.valueOf() + ele.style.height.valueOf();
    this.calcOffsetX = Math.abs(event.detail.clientX - this.calcLeft);
    this.calcOffsetY = Math.abs(event.detail.clientY - this.calcTop);
    // this.onDrag(cornerType, ele, event);
  }

  onDrag(cornerType: String, ele: MetaData, event: any) {
    console.log("eleele",ele);
    event.stopPropagation();
    let metaDataConfig = this.metaDataService.getMetaDataConfig();
    let index = metaDataConfig.findIndex((e) => e.id == ele.id);
    let top = ele.style.top;
    let left = ele.style.left;
    let width = ele.style.width;
    let height = ele.style.height;

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

    ele.style.top = top;
    ele.style.left = left;
    ele.style.width = width;
    ele.style.height = height;
    metaDataConfig[index] = ele;
    this.metaDataService.setMetaDataConfig(metaDataConfig);
  }

  onDragEnd(cornerType: String, ele: MetaData, event: any) {
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

  capture(event, data: MetaData, type){
    event.stopPropagation();
    if(type == 'enter'){
      this.activeMetaData = data
    }
    else if(type == 'leave' && this.activeMetaData == data){
      this.activeMetaData = null;
    }
    this.metaDataService.setActiveMetaDataOnHover(this.activeMetaData);
  }

}
