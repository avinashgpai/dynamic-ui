import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMetaDataComponent } from './manage-meta-data.component';

describe('ManageMetaDataComponent', () => {
  let component: ManageMetaDataComponent;
  let fixture: ComponentFixture<ManageMetaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMetaDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
