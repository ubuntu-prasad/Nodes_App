import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedUsersPage } from './connected-users.page';

describe('ConnectedUsersPage', () => {
  let component: ConnectedUsersPage;
  let fixture: ComponentFixture<ConnectedUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
