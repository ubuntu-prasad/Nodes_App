import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNodePage } from './add-node.page';

describe('AddNodePage', () => {
  let component: AddNodePage;
  let fixture: ComponentFixture<AddNodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
