import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleProfileComponent } from './sample-profile.component';

describe('SampleProfileComponent', () => {
  let component: SampleProfileComponent;
  let fixture: ComponentFixture<SampleProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
