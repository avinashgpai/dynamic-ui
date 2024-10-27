import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-config',
  templateUrl: './theme-config.component.html',
  styleUrls: ['./theme-config.component.css']
})
export class ThemeConfigComponent implements OnInit {

  @Input() previewMode: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
