import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CaptureScreenService } from 'src/app/services/capture-screen.service';
import { MetaData, MetaDataService } from 'src/app/services/meta-data.service';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.css']
})
export class MetaDataComponent implements OnInit, AfterViewInit {

  metaData: MetaData[] = [];
  previewMode: boolean = false;
  @ViewChild('captureArea', { static: false }) captureArea: ElementRef;
  
  constructor(private metaDataService: MetaDataService, private previewModeService: PreviewService, private cdr: ChangeDetectorRef, private captureScreenService: CaptureScreenService) { }

  ngOnInit(): void {

    this.previewMode = this.previewModeService.getCurrentPreviewMode();

    this.previewModeService.getPreviewMode().subscribe((value: boolean)=>{
      this.previewMode = value;
    })
    
    this.metaDataService.getMetaData().subscribe((data: MetaData[])=>{
      this.metaData = data;
      this.cdr.detectChanges();
      console.log("aaa",this.metaData);
    });
  }

  ngAfterViewInit(): void {
    this.captureScreenService.setCaptureElement(this.captureArea);
  }

}
