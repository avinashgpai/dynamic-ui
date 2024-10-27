import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ContextMenuData, ContextMenuService } from 'src/app/services/context-menu.service';
import { MousePointerService, MousePosition } from 'src/app/services/mouse-pointer.service';

class ContextMenuConfig {
  display?: String;
  value?: String;
  icon?: String;
  iconLike?: String;
  level?: Number;
  info?: String;
  options?: ContextMenuConfig[];
  rotation?: String;
  animate?: String;
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit, OnChanges {

  left: string;
  top: string;
  @Input() open: Boolean;
  contextMenuList: ContextMenuConfig[] = [];
  hoverList: string[] = [];
  contextMenu = null;
  xQuadrant: 1 | -1 = 1;
  yQuadrant: 1 | -1 = 1;


  constructor(private elRef: ElementRef, private mousePointerService: MousePointerService, private contextMenuService: ContextMenuService) {
    // this.contextMenuList = [
    //   {
    //     display: "Add", value: "add", level: 1, icon: "add_circle", options: [
    //       { display: "Container", value: "container", level: 2, icon: "crop_din"},
    //       { display: "Form", value: "form", level: 2, icon: "assignment"},
    //       { display: "Grid Layout", value: "grid", level: 2, icon: "grid_on"},
    //       {
    //         display: "Element", value: "element", level: 2, icon: "view_quilt", options: [
    //           { display: "Image", value: "image", level: 3, icon: "photo" },
    //           { value: "hr" },
    //           { display: "Label", value: "label", level: 3, icon: "label" },
    //           { display: "Input", value: "input", level: 3, icon: "text_fields", options: [
    //             { display: "Text", value: "text", level: 4, icon: "text_format" },
    //             { display: "Number", value: "number", level: 4, icon: "dialpad" },
    //             { display: "Checkbox", value: "checkbox", level: 4, icon: "check_box" },
    //             { display: "Radio", value: "radio", level: 4, icon: "radio_button_checked" },
    //             { display: "Date Picker", value: "date", level: 4, icon: "calendar_today" },
    //             { display: "Color Picker", value: "color", level: 4, icon: "colorize" },
    //             { display: "Range", value: "range", level: 4, icon: "linear_scale" }
    //           ]},
    //           { value: "hr" },
    //           { display: "Button", value: "button", level: 3, icon: "touch_app" },
    //           { display: "Icon", value: "icon", level: 3, icon: "code" },
    //           { value: "hr" },
    //           { display: "Iframe", value: "iframe", level: 3, icon: "attachment" },
    //           { value: "hr" },
    //           { display: "Horizontal Line", value: "hrLine", level: 3, icon: "trending_flat" },
    //           { display: "Vertical Line", value: "vrLine", level: 3, icon: "trending_flat", rotation: "rotate-90" },
    //         ]
    //       },
    //       // {
    //       //   display: "Pipe", value: "pipe", level: 2, icon: "category", info: "A special utility provided by angular used to transform data in HTML or logic into something useful and understandable." ,options: [
    //       //     { display: "Currency", value: "currency", level: 3, icon: "attach_money" },
    //       //     { display: "Number", value: "number", level: 3, iconLike: "1,000.5" },
    //       //     { display: "Key Value", value: "keyValue", level: 3, iconLike: "{ }" },
    //       //     { display: "Async", value: "async", level: 3, icon: "hourglass_full" },
    //       //   ]
    //       // },
    //       // {
    //       //   display: "Directive", value: "directive", level: 2, icon: "directions", info: "A special utility provided by Angular is used to modify behavior in HTML.", options: [
    //       //     {
    //       //       display: "Conditional", value: "conditional", level: 3, icon: "device_hub", options: [
    //       //         { display: "If", value: "if", level: 4 },
    //       //         { display: "Switch", value: "switch", level: 4 },
    //       //       ]
    //       //     },
    //       //     { display: "Loop", value: "loop", level: 3, icon: "loop" }
    //       //   ]
    //       // },
    //       // {
    //       //   display: "Style", value: "style", level: 2, icon: "style", options: [
    //       //     { display: "Background Color", value: "bgColor", level: 3, icon: "format_paint"},
    //       //     { display: "Font Color", value: "textColor", level: 3, icon: "format_color_fill"},
    //       //     { display: "Border", value: "border", level: 3, icon: "border_outer"}
    //       //   ]
    //       // }
    //     ]
    //   },
    //   // { value: "hr" },
    //   // { display: "Generate Code", value: "generateCode", level: 1, icon: "description" },
    //   { value: "hr" },
    //   // { display: "Capture Screenshot", value: "captureScreenshot", level: 1, icon: "photo_camera" }
    //   { display: "Animate", value: "animate", level: 1, icon: "apps" , animate: 'animate-[animateIconRandom_3s_ease-in-out_infinite]'}
    // ]

    this.contextMenuList = [
      { display: "Container", value: "container", level: 2, icon: "crop_din"},
      { display: "Form", value: "form", level: 2, icon: "assignment"},
      { display: "Grid Layout", value: "grid", level: 2, icon: "grid_on"},
      {
        display: "Element", value: "element", level: 2, icon: "view_quilt", options: [
          { display: "Image", value: "image", level: 3, icon: "photo" },
          { value: "hr" },
          { display: "Label", value: "label", level: 3, icon: "label" },
          { display: "Input", value: "input", level: 3, icon: "text_fields", options: [
            { display: "Text", value: "text", level: 4, icon: "text_format" },
            { display: "Number", value: "number", level: 4, icon: "dialpad" },
            { display: "Checkbox", value: "checkbox", level: 4, icon: "check_box" },
            { display: "Radio", value: "radio", level: 4, icon: "radio_button_checked" },
            { display: "Date Picker", value: "date", level: 4, icon: "calendar_today" },
            { display: "Color Picker", value: "color", level: 4, icon: "colorize" },
            { display: "Range", value: "range", level: 4, icon: "linear_scale" }
          ]},
          { value: "hr" },
          { display: "Button", value: "button", level: 3, icon: "touch_app" },
          { display: "Icon", value: "icon", level: 3, icon: "code" },
          { value: "hr" },
          { display: "Iframe", value: "iframe", level: 3, icon: "attachment" },
          { value: "hr" },
          { display: "Horizontal Line", value: "hrLine", level: 3, icon: "trending_flat" },
          { display: "Vertical Line", value: "vrLine", level: 3, icon: "trending_flat", rotation: "rotate-90" },
        ]
      }
    ]
    
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    this.mousePointerService.getCursorPosition().subscribe((position: MousePosition) => {
      this.contextMenu = this.elRef.nativeElement.querySelector('#context-menu');
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
      const { offsetWidth: menuWidth, offsetHeight: menuHeight } = this.contextMenu;

      if (position.yCoortinate > (windowHeight/2)) {
        this.top = (position.yCoortinate - menuHeight) + "px";
        this.yQuadrant = 1;
      }else{
        this.top = position.yCoortinate + "px";
        this.yQuadrant = -1;
      }
  
      if (position.xCoortinate > (windowWidth/2)) {
        this.left = (position.xCoortinate - menuWidth) + "px";
        this.xQuadrant = 1;
      }else{
        this.left = position.xCoortinate + "px";
        this.xQuadrant = -1;
      }
    });
  }

  hoverTile(event: MouseEvent, level: number, value: String) {
    event.stopPropagation();
    if (this.hoverList.length >= level) {
      this.hoverList[level - 1] = value + "-" + level;
      this.hoverList = this.hoverList.slice(0, level);
    } else {
      let temp = this.hoverList.slice(0, level - 1);
      temp.push(value + "-" + level);
      this.hoverList = temp;
    }
    this.updateMenuVisibility(this.contextMenuList);
  }

  updateMenuVisibility(temp) {
    temp.map((e) => {
      e["show"] = this.hoverList.includes(e.value + "-" + e.level) ? true : false;
      if (e["options"] && e["options"].length > 0) {
        this.updateMenuVisibility(e["options"]);
      }
    })
  }

  selectOption(event: any, menuOption: String, optionDisplay: String){
    let data : ContextMenuData = new  ContextMenuData();
    data.contextMenuOpen = false;
    data.menuSelected = menuOption;
    data.mousePositionData = {
      clientX : event.clientX,
      clientY : event.clientY
    }
    data.display = optionDisplay;
    this.contextMenuService.setContextMenuData(data);
  }

}
