import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportImportJsonComponent } from './export-import-json.component';

describe('ExportImportJsonComponent', () => {
  let component: ExportImportJsonComponent;
  let fixture: ComponentFixture<ExportImportJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportImportJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportImportJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
