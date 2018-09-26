import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersideLoggingComponent } from './serverside-logging.component';

describe('ServersideLoggingComponent', () => {
  let component: ServersideLoggingComponent;
  let fixture: ComponentFixture<ServersideLoggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersideLoggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersideLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
