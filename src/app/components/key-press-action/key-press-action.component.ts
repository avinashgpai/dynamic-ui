import { Component, OnInit } from '@angular/core';
import { KeyPressService, KeyPressedDataList } from 'src/app/services/key-press.service';
import { MetaDataService, MetaData } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-key-press-action',
  templateUrl: './key-press-action.component.html',
  styleUrls: ['./key-press-action.component.css']
})
export class KeyPressActionComponent implements OnInit {

  showActionMessage: boolean = false;
  actionMessage: String = null;
  metaData: MetaData = null;

  constructor(private keyPressService: KeyPressService, private metaDataService: MetaDataService) { }

  ngOnInit(): void {
    this.keyPressService.getKeyPressedData().subscribe((data: KeyPressedDataList)=>{
      let keyList = data.keyList;
      console.log('key list', keyList)
      let metaDataWRTmousePointer: MetaData = this.metaDataService.getActiveMetaDataOnHover();
      this.metaData = new MetaData();
      this.metaData = { ...metaDataWRTmousePointer}
      this.metaData.style = {...metaDataWRTmousePointer.style};
      this.metaData.type = metaDataWRTmousePointer.type;
      this.metaData.display = metaDataWRTmousePointer.display;
      if(this.metaData != undefined){
        if(keyList["Control"] && keyList["c"]){
          this.metaData.style.top = Number(metaDataWRTmousePointer.style.top.valueOf() + 30);
          this.metaData.style.left = Number(metaDataWRTmousePointer.style.left.valueOf() + 30);

          console.log("metaData",this.metaData);
          this.metaDataService.setMetaData(this.metaData);
          this.showActionMessage = true;
          this.actionMessage = `<span class='text-gray-400 bg-gray-200 rounded-md p-2'>Ctrl + C</span><span class='text-indigo-800'> : ${metaDataWRTmousePointer.id} Copied!</span>`;
          this.metaData = null;
        }
        setTimeout(()=>{
          this.showActionMessage = false;
          this.actionMessage = null;
          this.keyPressService.setKeyPressedDataList({
            "keyList": {},
            "xCoord": null,
            "yCoord": null,
          });
        },1000)
      }
    })
  }
}
