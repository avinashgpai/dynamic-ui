import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BoxCoordinateService, coord } from 'src/app/services/box-coordinate.service';
import { MousePointerService, MousePosition } from 'src/app/services/mouse-pointer.service';

@Component({
  selector: 'app-cursor-ref',
  templateUrl: './cursor-ref.component.html',
  styleUrls: ['./cursor-ref.component.css']
})
export class CursorRefComponent implements OnInit, OnChanges {

  left: string;
  top: string;
  box: coord[] = [];
  @Input() previewMode: boolean = true;

  constructor(private mousePointerService: MousePointerService, private boxCoorinateService: BoxCoordinateService, private cdr: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("CursorRefComponent",changes)
  }

  ngOnInit(): void {
    this.mousePointerService.getCursorPosition().subscribe((position: MousePosition)=>{
      this.left = position.xCoortinate + "px";
      this.top = position.yCoortinate + "px";
    });

    this.boxCoorinateService.getBoxCoordinatesData().subscribe((data: coord[])=>{
      this.box = data;
      this.cdr.detectChanges();
    })
  }

}
