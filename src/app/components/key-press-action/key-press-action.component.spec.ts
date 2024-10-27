import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPressActionComponent } from './key-press-action.component';

describe('KeyPressActionComponent', () => {
  let component: KeyPressActionComponent;
  let fixture: ComponentFixture<KeyPressActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPressActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPressActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
