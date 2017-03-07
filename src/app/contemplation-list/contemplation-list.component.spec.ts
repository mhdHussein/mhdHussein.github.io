/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContemplationListComponent } from './contemplation-list.component';

describe('ContemplationListComponent', () => {
  let component: ContemplationListComponent;
  let fixture: ComponentFixture<ContemplationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContemplationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContemplationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
