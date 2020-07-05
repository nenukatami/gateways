import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  // public activeModal: NgbActiveModal
  let activeModalStub: Partial<NgbActiveModal>;
  activeModalStub = {};
  let modalMessage = "modal works!";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ],
      providers: [
        { provide: NgbActiveModal, useValue: activeModalStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    component.data = modalMessage;
    fixture.detectChanges();
  });

  it('should component be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "modal works!"', () => {
    // Tips
    // In the opened browser that shows the testing result, you can
    // open the Developers Tools and add console.log to any test for debugging purpose.
    const modelDebug: DebugElement = fixture.debugElement;
    const paragraphDebug = modelDebug.query(By.css('.modal-body p'));
    const p: HTMLElement = paragraphDebug.nativeElement;
    // console.log(p);
    expect(p.textContent).toEqual(modalMessage);
  });
});
