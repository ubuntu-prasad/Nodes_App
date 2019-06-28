import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodePage } from './edit-node.page';

describe('EditNodePage', () => {
  let component: EditNodePage;
  let fixture: ComponentFixture<EditNodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
