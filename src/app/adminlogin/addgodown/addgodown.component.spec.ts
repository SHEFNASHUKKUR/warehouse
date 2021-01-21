import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgodownComponent } from './addgodown.component';

describe('AddgodownComponent', () => {
  let component: AddgodownComponent;
  let fixture: ComponentFixture<AddgodownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgodownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgodownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
