import { Component, Input, OnInit } from '@angular/core';
import { GenerateCodeService } from 'src/app/services/generate-code.service';
import { MetaData, MetaDataService } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.css']
})
export class GenerateCodeComponent implements OnInit {

  @Input() previewMode: boolean = true;
  
  constructor(private generateCodeService: GenerateCodeService, private metaDataService: MetaDataService) { }

  ngOnInit(): void {

  }

  generateCode(){
    let metaDataList = this.metaDataService.getMetaDataConfig();
    console.log("metaDataList",metaDataList)
    let a = this.generateCodeService.generateHtmlFromJson(JSON.stringify(metaDataList));

    console.log("generatedCode",a)
  }
}
