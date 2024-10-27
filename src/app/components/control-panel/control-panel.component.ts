import { Component, OnInit } from '@angular/core';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  togglePreviewMode: boolean = true;
  toggleLinking: boolean = false;

  constructor(private previewModeService: PreviewService, private metaDataService: MetaDataService) { }

  ngOnInit(): void {
  }

  toggleDeveloperMode(value: boolean){
    this.togglePreviewMode = value;
    this.previewModeService.setPreviewMode(value);
  }

  toggleLink(value: boolean){
    this.toggleLinking = value;
    // this.previewModeService.setPreviewMode(value);
  }

  delete(){
    this.metaDataService.setMetaDataConfig([]);
    this.metaDataService.setActiveMetaDataOnEdit(null, null);
  }

}
