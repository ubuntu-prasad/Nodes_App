import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesPage } from './nodes.page';

describe('NodesPage', () => {
  let component: NodesPage;
  let fixture: ComponentFixture<NodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
