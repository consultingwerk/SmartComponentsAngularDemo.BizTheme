import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AblDojoComponent } from './abl-dojo.component';

describe('AblDojoComponent', () => {
  let component: AblDojoComponent;
  let fixture: ComponentFixture<AblDojoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AblDojoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AblDojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
