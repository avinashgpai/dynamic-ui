import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MetaData, MetaDataService } from 'src/app/services/meta-data.service';
import { MousePointerService } from 'src/app/services/mouse-pointer.service';
import * as Constants from 'src/app/constants/constant';

@Component({
  selector: 'app-edit-meta-data',
  templateUrl: './edit-meta-data.component.html',
  styleUrls: ['./edit-meta-data.component.css']
})
export class EditMetaDataComponent implements OnInit {

  activeMetaData: MetaData = null;
  metaDataList: MetaData[] = [];
  activeMetaDataIndex: number = null;
  position: string = null;
  editPopup = null;
  top: number = 20;
  left: number = 20;
  dragging: boolean = false;
  offsetX: number = null;
  offsetY: number = null;
  form: FormGroup;
  phase: String = "font";
  bgOptions: String[] = Constants.bgOptions;
  borderOptions: any[] = Constants.borderOptions;
  linearGradientDirectionOptions: String[] = Constants.linearGradDirectionOptions
  iconsList: String[] = Constants.iconsList.sort();
  borderStyleOptions: String[] = Constants.borderStyleOptions;
  @Input() previewMode: boolean = false;
  @ViewChild('bgColor') bgColor: ElementRef<HTMLInputElement>;

  constructor(private elRef: ElementRef, private metaDataService: MetaDataService, private mousePointerService: MousePointerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      label: [{ value: null, disabled: false }],
      placeholder: [{ value: null, disabled: false }],
      fontSize: [{ value: null, disabled: false }],
      textColor: [{ value: null, disabled: false }],
      backGroundColorType: [{ value: null, disabled: false }],
      backGroundColor: [{ value: null, disabled: false }],
      linearGradientDirectionType: [{ value: null, disabled: false }],
      linearGradientDirection: [{ value: null, disabled: false }],
      fromBackGroundColor: [{ value: null, disabled: false }],
      toBackGroundColor: [{ value: null, disabled: false }],
      borderType: [{ value: null, disabled: false }],
      borderColor: [{ value: null, disabled: false }],
      borderStyle: [{ value: null, disabled: false }],
      borderWidth: [{ value: null, disabled: false }],
      borderRadiusType: [{ value: null, disabled: false }],
      borderRadius: [{ value: null, disabled: false }],
      gridCellColorType: [{ value: null, disabled: false }],
      gridCellColor: [{ value: null, disabled: false }],
      gridLinearGradientDirectionType: [{ value: null, disabled: false }],
      gridLinearGradientDirection: [{ value: null, disabled: false }],
      gridFromBackGroundColor: [{ value: null, disabled: false }],
      gridToBackGroundColor: [{ value: null, disabled: false }],
      gridColCount: [{ value: null, disabled: false }],
      gridRowCount: [{ value: null, disabled: false }],
      gridGap: [{ value: null, disabled: false }],
      icon: [{ value: null, disabled: false }]
    })

    this.metaDataService.getActiveMetaDataEdit().subscribe((resp: any) => {
      console.log("activeMetaData", resp.metaData);
      this.activeMetaData = resp.metaData;
      this.activeMetaDataIndex = resp.index;

      if (this.activeMetaData) {
        this.form.patchValue({
          "label": this.activeMetaData.staticLabel && this.activeMetaData.staticLabel.length > 0 ? this.capitalizeFirstLetter(this.activeMetaData.staticLabel) : null,
          "placeholder": this.activeMetaData.placeholder,
          "fontSize": this.activeMetaData.style.fontSize,
          "textColor": this.activeMetaData.style.textColor,
          "backGroundColorType": this.activeMetaData.style.backGroundColorType,
          "backGroundColor": this.activeMetaData.style.backGroundColor,
          "linearGradientDirectionType": this.activeMetaData.style.linearGradientDirectionType,
          "linearGradientDirection": this.activeMetaData.style.linearGradientDirection.includes('deg') ? Number(this.activeMetaData.style.linearGradientDirection.split("deg")[0]) : this.activeMetaData.style.linearGradientDirection,
          "fromBackGroundColor": this.activeMetaData.style.fromBackgroundColor,
          "toBackGroundColor": this.activeMetaData.style.toBackgroundColor,
          "gridCellColorType": this.activeMetaData.style.gridCellColorType,
          "gridCellColor": this.activeMetaData.style.gridCellColor,
          "gridLinearGradientDirectionType": this.activeMetaData.style.gridLinearGradientDirectionType,
          "gridLinearGradientDirection": this.activeMetaData.style.gridLinearGradientDirection ?  this.activeMetaData.style.gridLinearGradientDirection.includes('deg') ? Number(this.activeMetaData.style.gridLinearGradientDirection.split("deg")[0]) : this.activeMetaData.style.gridLinearGradientDirection : null,
          "gridFromBackGroundColor": this.activeMetaData.style.gridFromBackgroundColor,
          "gridToBackGroundColor": this.activeMetaData.style.gridToBackgroundColor,
          "gridColCount": this.activeMetaData.style.gridColumnCount,
          "gridRowCount": this.activeMetaData.style.gridRowCount,
          "gridGap": this.activeMetaData.style.gridGap,
          "icon": this.activeMetaData.icon,
          "borderStyle": this.activeMetaData.style.borderStyle,
          "borderWidth": this.activeMetaData.style.borderWidth,
          "borderColor": this.activeMetaData.style.borderColor,
          "borderRadiusType": this.activeMetaData.style.borderRadiusType,
          "borderRadius": this.activeMetaData.style.borderRadiusType == 'percentage'? Number(this.activeMetaData.style.borderRadius.split("%")[0]) : Number(this.activeMetaData.style.borderRadius.split("px")[0])
        })
        if(this.activeMetaData.type == 'icon'){
          this.phase = 'icon';
        }
        else if (this.activeMetaData.type == 'label' || this.activeMetaData.type == 'button' || this.activeMetaData.type == 'text' || this.activeMetaData.type == 'number' || this.activeMetaData.type == 'date') {
          this.phase = 'text';
        } else if (this.activeMetaData.type == 'grid') {
          this.phase = 'grid';
        }
        else if (this.activeMetaData.type != 'image' && this.activeMetaData.type != 'iframe') {
          this.phase = 'background';
        }
      }
      if (!this.activeMetaData) {
        this.top = 20;
        this.left = 20;
        this.phase = "text";
      }
    })

    this.form.valueChanges.subscribe((e: any) => {
      console.log(e);
      this.activeMetaData.staticLabel = e.label;
      this.activeMetaData.placeholder = e.placeholder;
      this.activeMetaData.style.fontSize = e.fontSize;
      this.activeMetaData.style.textColor = e.textColor;
      this.activeMetaData.style.backGroundColorType = e.backGroundColorType;
      this.activeMetaData.style.backGroundColor = e.backGroundColor;
      this.activeMetaData.style.fromBackgroundColor = e.fromBackGroundColor;
      this.activeMetaData.style.toBackgroundColor = e.toBackGroundColor;
      this.activeMetaData.style.gridCellColorType = e.gridCellColorType;
      this.activeMetaData.style.gridCellColor = e.gridCellColor;
      this.activeMetaData.style.gridLinearGradientDirectionType = e.gridLinearGradientDirectionType;
      this.activeMetaData.style.gridLinearGradientDirection = e.gridLinearGradientDirectionType == "Definite direction" ? e.gridLinearGradientDirection : e.gridLinearGradientDirection + 'deg';
      this.activeMetaData.style.gridFromBackgroundColor = e.gridFromBackGroundColor;
      this.activeMetaData.style.gridToBackgroundColor = e.gridToBackGroundColor;
      this.activeMetaData.style.gridColumnCount = e.gridColCount;
      this.activeMetaData.style.gridRowCount = e.gridRowCount;
      this.activeMetaData.style.gridGap = e.gridGap;
      this.activeMetaData.style.linearGradientDirectionType = e.linearGradientDirectionType,
      this.activeMetaData.style.linearGradientDirection = e.linearGradientDirectionType == "Definite direction" ? e.linearGradientDirection : e.linearGradientDirection + 'deg';
      this.activeMetaData.icon = e.icon;
      this.activeMetaData.style.borderStyle = e.borderStyle;
      this.activeMetaData.style.borderWidth = e.borderWidth;
      this.activeMetaData.style.borderColor = e.borderColor;
      this.activeMetaData.style.borderRadiusType = e.borderRadiusType;
      this.activeMetaData.style.borderRadius = e.borderRadiusType == 'percentage'? e.borderRadius + "%": e.borderRadius + "px";

      console.log("activeMetaDataIndex",this.activeMetaDataIndex,"metaDataList",this.metaDataList)
      this.metaDataList = this.metaDataService.getMetaDataConfig();
      this.metaDataList[this.activeMetaDataIndex] = this.activeMetaData;
      this.metaDataService.setMetaDataConfig(this.metaDataList);
    })
  }

  close() {
    this.metaDataService.setActiveMetaDataOnEdit(null, null);
  }

  capitalizeFirstLetter(string) {
    console.log("char", string[0]);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onDragStart(event: any) {
    this.dragging = true;
    this.editPopup = this.elRef.nativeElement.querySelector('#edit-meta-data');
    let mousePointerData = this.mousePointerService.getMousePointer();
    this.top = this.editPopup.offsetTop;
    this.left = this.editPopup.offsetLeft;
    console.log("top", this.top, this.left, this.editPopup)
    this.offsetX = mousePointerData.xCoortinate - this.left;
    this.offsetY = mousePointerData.yCoortinate - this.top;
    // console.log('drag start', event);
  }

  onDrag(event: any) {
    // console.log('dragging', event);
    const { clientX: mouseXCoord, clientY: mouseYCoord } = event.detail;
    // console.log("mouseXCoord", mouseXCoord, "mouseYCoord", mouseYCoord, this.offsetX, this.offsetY);
    this.left = mouseXCoord - this.offsetX;
    this.top = mouseYCoord - this.offsetY;
    console.log('top', this.top, 'left', this.left);
  }

  onDragEnd(event: any) {
    this.dragging = false;
    //console.log('drag end', event);
  }

  openColor(type) {
    if (type == 'bgColor') {
      this.bgColor.nativeElement.focus();
    }
  }

  updateBorderOption(option, formValue, formContainsBorderTopParam, formContainsBorderRightParam, formContainsBorderBottomParam, formContainsBorderLeftParam) {
    if (option.value == "All") {
      if (formValue && formValue.includes('All')) {
        this.form.patchValue({ 'borderType': ['All'] })
        this.borderOptions.map((e) => {
          if (e.value != "All") {
            e.disable = true
          }
        })
      } else {
        this.borderOptions.map((e) => {
          if (e.value != "All") {
            e.disable = false
          }
        })
      }
    } else {
      let formContainsBorderTop = formContainsBorderTopParam;
      let formContainsBorderRight = formContainsBorderRightParam;
      let formContainsBorderBottom = formContainsBorderBottomParam;
      let formContainsBorderLeft = formContainsBorderLeftParam;

      this.borderOptions.map((e) => {
        if (e.disable) {
          if (option.value == "Border Top" && ((e.value == "Border Top Right" && !formContainsBorderRight) || (e.value == "Border Top Left" && !formContainsBorderLeft))) {
            console.log("condition 1")
            e.disable = false
          }
          if (option.value == "Border Right" && ((e.value == "Border Top Right" && !formContainsBorderTop) || (e.value == "Border Bottom Right" && !formContainsBorderBottom))) {
            console.log("condition 2")
            e.disable = false
          }
          if (option.value == "Border Bottom" && ((e.value == "Border Bottom Right" && !formContainsBorderRight) || (e.value == "Border Bottom Left" && !formContainsBorderLeft))) {
            console.log("condition 3")
            e.disable = false
          }
          if (option.value == "Border Left" && ((e.value == "Border Top Left" && !formContainsBorderTop) || (e.value == "Border Bottom Left" && !formContainsBorderBottom))) {
            console.log("condition 4")
            e.disable = false
          }
        } else {
          if (option.value == "Border Top" ? (e.value == "Border Top Right" || e.value == "Border Top Left") : false) {
            e.disable = true
          }
          if (option.value == "Border Right" ? (e.value == "Border Top Right" || e.value == "Border Bottom Right") : false) {
            e.disable = true
          }
          if (option.value == "Border Bottom" ? (e.value == "Border Bottom Right" || e.value == "Border Bottom Left") : false) {
            e.disable = true
          }
          if (option.value == "Border Left" ? (e.value == "Border Top Left" || e.value == "Border Bottom Left") : false) {
            e.disable = true
          }

        }
      })
      this.form.patchValue({ 'borderType': formValue.filter((e) => { return (option.value == "Border Top" ? e != "Border Top Right" && e != "Border Top Left" : option.value == "Border Right" ? e != "Border Top Right" && e != "Border Bottom Right" : option.value == "Border Bottom" ? e != "Border Bottom Right" && e != "Border Bottom Left" : option.value == "Border Left" ? e != "Border Top Left" && e != "Border Bottom Left" : true) }) })
    }
  }

}
