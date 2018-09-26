import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppserverManagerComponent } from './appserver-manager.component';

describe('AppserverManagerComponent', () => {
  let component: AppserverManagerComponent;
  let fixture: ComponentFixture<AppserverManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppserverManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppserverManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
