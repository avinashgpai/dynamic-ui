import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BoxCoordinateService, coord } from './services/box-coordinate.service';
import { ContextMenuService, ContextMenuData } from './services/context-menu.service';
import { MousePointerService, MousePosition } from './services/mouse-pointer.service';
import { MetaData, MetaDataService, Style } from './services/meta-data.service';
import { AlignmentRefService, RefCoordinates, RefData } from './services/alignment-ref.service';
import { KeyPressService, KeyBoardPressData } from './services/key-press.service';
import { PreviewService } from './services/preview.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  openCustomContextMenu: Boolean = false;
  boxCoordinates: coord[] = [];
  optionSelected: boolean = false;
  boxOpen: boolean = false;
  metaData: MetaData = null;
  previewMode: boolean = true;
  @ViewChild('focusScreen') focusableDiv!: ElementRef;

  constructor(private mousePointerService: MousePointerService, private contextMenuService: ContextMenuService, private boxCoordinateService: BoxCoordinateService, private metaDataService: MetaDataService, private alignmentRefService: AlignmentRefService, private keyPressService: KeyPressService, private previewModeService: PreviewService) { }
  
  ngAfterViewInit(): void {
    this.focusableDiv.nativeElement.focus();

    this.previewMode = this.previewModeService.getCurrentPreviewMode();

    this.previewModeService.getPreviewMode().subscribe((value: boolean)=>{
      this.previewMode = value;
      if(!this.previewMode){
        this.openCustomContextMenu = false;
      }
    })
  }

  ngOnInit(): void {
    this.contextMenuService.getContextMenuData().subscribe((data: ContextMenuData) => {
      if (!data.contextMenuOpen && data.menuSelected != 'close') {
        this.boxOpen = true;
        this.closeContextMenu(data?.mousePositionData);
        this.metaData = new MetaData();
        this.metaData.type = data.menuSelected;
        this.metaData.display = data.display;
        if (this.boxCoordinateService.getBoxCoord().length == 2) {
          let boxCoord: coord[] = this.boxCoordinateService.getBoxCoord();
          let top: Number = 0;
          let left: Number = 0;
          let width: Number = 0;
          let height: Number = 0;

          if (boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf() >= 0) {
            width = boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf();
            left = boxCoord[0].x.valueOf();
          } else {
            left = boxCoord[0].x.valueOf() - Math.abs(boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf());
            width = Math.abs(boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf());
          }

          if (boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf() >= 0) {
            height = boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf();
            top = boxCoord[0].y.valueOf();
          } else {
            top = boxCoord[0].y.valueOf() - Math.abs(boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf());
            height = Math.abs(boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf());
          }

          let style: Style = new Style();
          style.position = "fixed";
          style.top = top;
          style.left = left;
          style.width = width;
          style.height = height;
          style.fontSize = 20;
          style.textColor = this.metaData.type == 'button' && this.metaData.type != 'image' && this.metaData.type != 'iframe'? '#FFFFFF' :  "#000000";
          style.backGroundColorType =  this.metaData.type != 'image' && this.metaData.type != 'iframe' ? 'Mono Color': null;
          style.backGroundColor = this.metaData.type == 'button' && this.metaData.type != 'image' && this.metaData.type != 'iframe'? '#000000': "#FFFFFF";
          style.gridCellColor = this.metaData.type == 'grid' ? '#FFFFFF': "#000000";
          style.gridColumnCount = this.metaData.type == 'grid' ? 2 : 0;
          style.gridRowCount = this.metaData.type == 'grid' ? 2 : 0;
          style.gridGap = this.metaData.type == 'grid' ? 8 : 0;
          style.linearGradientDirectionType = "Definite direction";
          style.linearGradientDirection = "to top right";
          style.gridCellColorType =  this.metaData.type == 'grid'? 'Mono Color': null;
          style.gridLinearGradientDirectionType = this.metaData.type == 'grid' ? "Definite direction": null;
          style.gridLinearGradientDirection =  this.metaData.type == 'grid' ? "to top right": null;
          style.borderWidth = 0;
          style.borderColor = "#000000";
          style.borderRadiusType = 'pixel';
          style.borderRadius =  this.metaData.type == 'button' ||  this.metaData.type == 'text' ||  this.metaData.type == 'number' ||  this.metaData.type == 'date'? '10px' : '0px';

          this.metaData.style = style;
          this.metaData.status = "add";

          this.metaDataService.setMetaData(this.metaData);

          this.updateAlignmentRef();
        }

      }

      if(data.menuSelected == 'close'){
        this.boxOpen = false;
        this.closeContextMenu(data?.mousePositionData);
      }
    });

    this.metaDataService.getActiveMetaDataEdit().subscribe((resp: any)=>{
      if(resp.metaData){
        this.boxOpen = false;
        this.closeContextMenu({clientX: this.mousePointerService.getMousePointer().xCoortinate, clientY: this.mousePointerService.getMousePointer().yCoortinate});
      }
    })
  }

  setMousePosition(event: MouseEvent) {

    if (!this.openCustomContextMenu && this.previewMode) {
      let coOrdinates: coord = new coord();

      coOrdinates.x = event.clientX;
      coOrdinates.y = event.clientY;

      let index = this.boxCoordinates.length - 1;
      if (index == 0 || index == 1) {
        this.boxCoordinates[index] = coOrdinates;
      } else if (index == -1) {
        this.boxCoordinates.push(coOrdinates);
      }
      this.boxCoordinateService.setBoxCoordinatesData(this.boxCoordinates);
      if (index == 1) {
        let config = this.metaDataService.getMetaDataConfig();

        let boxCoord: coord[] = this.boxCoordinateService.getBoxCoord();
        let top: Number = 0;
        let left: Number = 0;
        let width: Number = 0;
        let height: Number = 0;

        if (boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf() >= 0) {
          width = boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf();
          left = boxCoord[0].x.valueOf();
        } else {
          left = boxCoord[0].x.valueOf() - Math.abs(boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf());
          width = Math.abs(boxCoord[1].x.valueOf() - boxCoord[0].x.valueOf());
        }

        if (boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf() >= 0) {
          height = boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf();
          top = boxCoord[0].y.valueOf();
        } else {
          top = boxCoord[0].y.valueOf() - Math.abs(boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf());
          height = Math.abs(boxCoord[1].y.valueOf() - boxCoord[0].y.valueOf());
        }

        let style: Style = new Style();
        style.position = "fixed";
        style.top = top;
        style.left = left;
        style.width = width;
        style.height = height;
        style.fontSize = 20;
        style.textColor = this.metaData.type == 'button' && this.metaData.type != 'image' && this.metaData.type != 'iframe'? '#FFFFFF' :  "#000000";
        style.backGroundColorType =  this.metaData.type != 'image' && this.metaData.type != 'iframe' ? 'Mono Color': null;
        style.backGroundColor = this.metaData.type == 'button' && this.metaData.type != 'image' && this.metaData.type != 'iframe'? '#000000': "#FFFFFF";
        style.gridCellColor = this.metaData.type == 'grid' ? '#FFFFFF': "#000000";
        style.gridColumnCount = this.metaData.type == 'grid' ? 2 : 0;
        style.gridRowCount = this.metaData.type == 'grid' ? 2 : 0;
        style.gridGap = this.metaData.type == 'grid' ? 8 : 0;
        style.linearGradientDirectionType = "Definite direction";
        style.linearGradientDirection = "to top right";
        style.gridCellColorType =  this.metaData.type == 'grid'? 'Mono Color': null;
        style.gridLinearGradientDirectionType = this.metaData.type == 'grid' ? "Definite direction": null;
        style.gridLinearGradientDirection =  this.metaData.type == 'grid' ? "to top right": null;
        style.borderWidth = 0;
        style.borderColor = "#000000";
        style.borderRadiusType = 'pixel';
        style.borderRadius =  this.metaData.type == 'button' ||  this.metaData.type == 'text' ||  this.metaData.type == 'number' ||  this.metaData.type == 'date'? '10px' : '0px';

        config[config.length - 1].style = style;
        this.metaData.status = "updateCoordinate";
        this.metaDataService.setMetaDataConfig(config)
      }
      this.mousePointerService.setCursorPosition(event.clientX, event.clientY);
      this.updateAlignmentRef();
    }
    if(!this.previewMode){
      this.mousePointerService.setCursorPosition(event.clientX, event.clientY);
    }
  }

  openContextMenu(event: any) {
    event.preventDefault();
    if(this.previewMode){
      let config = this.metaDataService.getMetaDataConfig();
      let allowedStatus = config.length > 0 ? config.some((e)=> {return e.status != "update"}) : true;
      if(allowedStatus){
        this.mousePointerService.setCursorPosition(event.clientX, event.clientY);
        this.openCustomContextMenu = true;
        let data: ContextMenuData = new ContextMenuData();
        data.contextMenuOpen = this.openCustomContextMenu;
        this.contextMenuService.setContextMenuData(data);
        let coOrdinates: coord = new coord();
    
        coOrdinates.x = event.clientX;
        coOrdinates.y = event.clientY;
    
        let index = this.boxCoordinates.length - 1;
        if (index == 1) {
          this.boxCoordinates.pop();
          index = index - 1;
        }
    
        this.boxCoordinates[index] = coOrdinates;
        this.boxCoordinateService.setBoxCoordinatesData(this.boxCoordinates);
      }
    }
  }

  closeContextMenu(event) {
    this.mousePointerService.setCursorPosition(event.clientX, event.clientY);

    let coOrdinates: coord = new coord();

    coOrdinates.x = event.clientX;
    coOrdinates.y = event.clientY;

    let index = this.boxCoordinates.length - 1;
    if (index == 1) {
      this.boxCoordinates[index] = coOrdinates;
    } else if (index == 0) {
      this.boxCoordinates.push(coOrdinates);
    }
    this.boxCoordinateService.setBoxCoordinatesData(this.boxCoordinates);
    setTimeout(() => {
      this.openCustomContextMenu = false;
    }, 10);
  }

  updatePointer(event) {

    if(this.previewMode){
      if (this.boxOpen) {
        this.boxOpen = false;
      }
      else {
        let coOrdinates: coord = new coord();
  
        coOrdinates.x = event.clientX;
        coOrdinates.y = event.clientY;
  
        let index = this.boxCoordinates.length - 1;
  
        if (index == 1) {
          this.boxCoordinates.pop();
          index = index - 1;
        }
  
        if (index == 0) {
          this.boxCoordinates[index] = coOrdinates;
        }
        this.boxCoordinateService.setBoxCoordinatesData(this.boxCoordinates);
        this.mousePointerService.setCursorPosition(event.clientX, event.clientY);
      }
    }

    if(!this.previewMode){
      this.mousePointerService.setCursorPosition(event.clientX, event.clientY);
    }
  }

  updateAlignmentRef(){
    let config = this.metaDataService.getMetaDataConfig();
    let alignmentRefCoord: RefCoordinates = new RefCoordinates();
    alignmentRefCoord.top = null;
    alignmentRefCoord.right = null;
    alignmentRefCoord.bottom = null;
    alignmentRefCoord.left = null;

    if(config.length >= 2 && this.boxCoordinateService.getBoxCoord().length == 2){

      let currentMetaData = config[config.length - 1];

      let currentMetaDataTop = currentMetaData.style.top;
      let currentMetaDataLeft = currentMetaData.style.left;
      let currentMetaDataWidth = currentMetaData.style.width;
      let currentMetaDataHeight = currentMetaData.style.height;

      config.map((data: MetaData, index: number)=>{
        if(index != config.length - 1){
          let metaDataTop = data.style.top;
          let metaDataLeft = data.style.left;
          let metaDataWidth = data.style.width;
          let metaDataHeight = data.style.height;

          if((currentMetaDataTop.valueOf() == metaDataTop.valueOf()) || (currentMetaDataTop.valueOf() == (metaDataTop.valueOf() + metaDataHeight.valueOf()))){
            let data: RefData = {top: currentMetaDataTop.valueOf(), left: currentMetaDataLeft.valueOf() - metaDataLeft.valueOf() > 0 ? metaDataLeft.valueOf(): currentMetaDataLeft.valueOf(), width: Math.abs(currentMetaDataLeft.valueOf() - metaDataLeft.valueOf()) };
            alignmentRefCoord.top = data;
          }

          if(((currentMetaDataLeft.valueOf() + currentMetaDataWidth.valueOf()) == metaDataLeft.valueOf()) || ((currentMetaDataLeft.valueOf() + currentMetaDataWidth.valueOf()) == (metaDataLeft.valueOf() + metaDataWidth.valueOf()))){
            let data: RefData = {top: currentMetaDataTop.valueOf() - metaDataTop.valueOf() > 0 ? metaDataTop.valueOf(): currentMetaDataTop.valueOf(), left: currentMetaDataLeft.valueOf() + currentMetaDataWidth.valueOf(), height: Math.abs(currentMetaDataTop.valueOf() - metaDataHeight.valueOf())};
            alignmentRefCoord.right = data;
          }

          if(((currentMetaDataTop.valueOf() + currentMetaDataHeight.valueOf()) == metaDataTop.valueOf()) || ((currentMetaDataTop.valueOf() + currentMetaDataHeight.valueOf()) == (metaDataTop.valueOf() + metaDataHeight.valueOf()))){
            let data: RefData = {top: currentMetaDataTop.valueOf() + currentMetaDataHeight.valueOf(), left: currentMetaDataLeft.valueOf() - metaDataLeft.valueOf() > 0 ? metaDataLeft.valueOf(): currentMetaDataLeft.valueOf(), width: Math.abs(currentMetaDataLeft.valueOf() - metaDataLeft.valueOf())  };
            alignmentRefCoord.bottom = data;
          }

          if((currentMetaDataLeft.valueOf() == metaDataLeft.valueOf()) || (currentMetaDataLeft.valueOf() == (metaDataLeft.valueOf() + metaDataWidth.valueOf()))){
            let data: RefData = {top: currentMetaDataTop.valueOf() - metaDataTop.valueOf() > 0 ? metaDataTop: currentMetaDataTop.valueOf(), left: currentMetaDataLeft.valueOf(), height: Math.abs(currentMetaDataTop.valueOf() - metaDataHeight.valueOf())};
            alignmentRefCoord.left = data;
          }
        }
      });
    }

    this.alignmentRefService.setRefCoordinate(alignmentRefCoord);
  }

  onKeyPress(event, type){
    if(this.previewMode && this.metaDataService.getActiveMetaDataOnHover()){
      let data = new KeyBoardPressData();
      let mousePointerData: MousePosition = this.mousePointerService.getMousePointer();
      data.event = type;
      data.keyCode = event.key;
      data.xCoord = mousePointerData.xCoortinate;
      data.yCoord = mousePointerData.yCoortinate;
      this.keyPressService.setKeyPressedData(data);
    }
  }

}