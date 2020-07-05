import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceComponent } from './add-device.component';
import { AddDeviceService } from './services/add-device.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;
  //
  let addDeviceServiceStub: Partial<AddDeviceService>;
  addDeviceServiceStub = {};
  let activeModalStub: Partial<NgbActiveModal>;
  activeModalStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeviceComponent],
      providers: [
        { provide: AddDeviceService, useValue: addDeviceServiceStub },
        { provide: NgbActiveModal, useValue: activeModalStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
