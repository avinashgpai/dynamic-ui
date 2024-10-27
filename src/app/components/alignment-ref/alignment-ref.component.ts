import { Component, OnInit } from '@angular/core';
import { AlignmentRefService, RefCoordinates } from 'src/app/services/alignment-ref.service';

@Component({
  selector: 'app-alignment-ref',
  templateUrl: './alignment-ref.component.html',
  styleUrls: ['./alignment-ref.component.css']
})
export class AlignmentRefComponent implements OnInit {

  refCoordinates: RefCoordinates;

  constructor(private alignmentRefService: AlignmentRefService) { }

  ngOnInit(): void {
    this.alignmentRefService.getRefCoordinate().subscribe((data: RefCoordinates) => {
      this.refCoordinates = data;
    })
  }

}
