import { EventEmitter, Injectable } from '@angular/core';
import { MetaDataService } from './meta-data.service';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportImportJsonService {
  private fileSizeUnit: number = 1024;
  private uploadProgress: number = -1;
  private filteredFile = null;
  private filteredFileEmiiter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private metaDataService: MetaDataService, private http: HttpClient) { }

  exportJson() {
    const blob = new Blob([JSON.stringify(this.metaDataService.getMetaDataConfig())], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meta-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getFileSize(fileSize: number): number {
    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSize = parseFloat((fileSize / this.fileSizeUnit).toFixed(2));
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSize = parseFloat(
          (fileSize / this.fileSizeUnit / this.fileSizeUnit).toFixed(2)
        );
      }
    }

    return fileSize;
  }

  getFileSizeUnit(fileSize: number) {
    let fileSizeInWords = 'bytes';

    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit) {
        fileSizeInWords = 'bytes';
      } else if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSizeInWords = 'KB';
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSizeInWords = 'MB';
      }
    }
    return fileSizeInWords;
  }

  readFile(file: File) {
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      }
    };

    reader.onload = () => {
      const fileContent = reader.result as string;
      try {
        const json = JSON.parse(fileContent);
        this.startProgress(file, json);
        // Process the JSON content as needed
      } catch (error) {
        console.error('Invalid JSON file:', error);
      }
      // Reset the upload progress after reading is complete
      this.uploadProgress = -1;
    };

    reader.onerror = () => {
      console.error('File read error:', reader.error);
      // Reset the upload progress in case of error
      this.uploadProgress = -1;
    };

    reader.readAsText(file);
  }

  async startProgress(file, data) {
    this.filteredFile = {
      FileName: file.name,
      FileSize:
        this.getFileSize(file.size) +
        ' ' +
        this.getFileSizeUnit(file.size),
      FileProgessSize: "0",
      FileProgress: 0,
      ngUnsubscribe: new Subject<any>(),
      data: data,
      Id: null
    }

    if (this.filteredFile != null) {
      let fileSize = this.getFileSize(file.size);
      let fileSizeInWords = this.getFileSizeUnit(file.size);
      for (var f = 0; f < fileSize + fileSize * 0.0001; f += fileSize * 0.01) {
        this.filteredFile.FileProgessSize = f.toFixed(2) + ' ' + fileSizeInWords;
        var percentUploaded = Math.round((f / fileSize) * 100);
        this.filteredFile.FileProgress = percentUploaded;
        this.filteredFileEmiiter.emit(this.filteredFile);
        await this.fakeWaiter(Math.floor(Math.random() * 35) + 1);
      }

    }
  }

  fakeWaiter(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  getFileProgress(): EventEmitter<any> {
    return this.filteredFileEmiiter;
  }
}
