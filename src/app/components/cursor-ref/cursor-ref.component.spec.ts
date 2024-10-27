import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursorRefComponent } from './cursor-ref.component';

describe('CursorRefComponent', () => {
  let component: CursorRefComponent;
  let fixture: ComponentFixture<CursorRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursorRefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursorRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
