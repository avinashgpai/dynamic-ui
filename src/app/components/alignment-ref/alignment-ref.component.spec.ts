import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentRefComponent } from './alignment-ref.component';

describe('AlignmentRefComponent', () => {
  let component: AlignmentRefComponent;
  let fixture: ComponentFixture<AlignmentRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignmentRefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlignmentRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
