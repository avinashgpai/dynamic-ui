import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetaDataComponent } from './edit-meta-data.component';

describe('EditMetaDataComponent', () => {
  let component: EditMetaDataComponent;
  let fixture: ComponentFixture<EditMetaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMetaDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
