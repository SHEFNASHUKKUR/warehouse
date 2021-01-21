import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagassignComponent } from './tagassign.component';

describe('TagassignComponent', () => {
  let component: TagassignComponent;
  let fixture: ComponentFixture<TagassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagassignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
