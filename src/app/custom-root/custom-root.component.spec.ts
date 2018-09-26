import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRootComponent } from './custom-root.component';

describe('CustomRootComponent', () => {
  let component: CustomRootComponent;
  let fixture: ComponentFixture<CustomRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
