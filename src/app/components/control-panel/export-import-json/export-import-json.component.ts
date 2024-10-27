import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportImportJsonService } from 'src/app/services/export-import-json.service';
import { MetaDataService } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-export-import-json',
  templateUrl: './export-import-json.component.html',
  styleUrls: ['./export-import-json.component.css']
})
export class ExportImportJsonComponent implements OnInit {

  showImportBox: boolean = false;
  filteredFile: any = null;
  
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(private exportImportJsonService: ExportImportJsonService, private cdr: ChangeDetectorRef, private metaDataService: MetaDataService) { }

  ngOnInit(): void {
    this.exportImportJsonService.getFileProgress().subscribe((resp)=>{
      this.filteredFile = resp;
      this.cdr.detectChanges();
      if(this.filteredFile.FileProgress == 100){
        this.metaDataService.setMetaDataConfig(this.filteredFile.data);
        setTimeout(()=>{
          this.fileInput.nativeElement.value = '';
          this.filteredFile = null;
        },5000)
      }
    })
  }

  export() {
    this.exportImportJsonService.exportJson();
  }

  import() {
    this.showImportBox = !this.showImportBox;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.exportImportJsonService.readFile(file);
    }
  }

}
