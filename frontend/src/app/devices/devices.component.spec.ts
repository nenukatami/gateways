import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './devices.component';
import { DeviceService } from './services/device.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Device } from '../devices/models/device';
import { DatePipe, formatDate } from '@angular/common';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;
  let dataPipe: DatePipe;

  let deviceList: Device[] = [
    {
      _id: '5efe3cb1f980d9b4343e9309',
      uid: 5383390,
      vendor: 'Mobilnet',
      status: true,
      dateCreated: new Date(),
    },
    {
      _id: '5efe3d13f980d9b4343e930c',
      uid: 53183390,
      vendor: 'AT&T',
      status: false,
      dateCreated: new Date(),
    },
  ];

  let modalServiceStub: Partial<NgbModal>;
  modalServiceStub = {};
  let deviceServiceStub: Partial<DeviceService>;
  deviceServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevicesComponent],
      providers: [
        { provide: NgbModal, useValue: modalServiceStub },
        { provide: DeviceService, useValue: deviceServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    component.devices = deviceList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list devices correctly', () => {
    const deviceListDebug: DebugElement = fixture.debugElement;
    const trDebug = deviceListDebug.queryAll(By.css('tbody tr'));
    expect(trDebug.length).toBe(2);

    trDebug.forEach((tr, i) => {
      const uidDebug = tr.query(By.css('.device-uid'));
      const vendorDebug = tr.query(By.css('.device-vendor'));
      const statusDebug = tr.query(By.css('.device-status'));
      const dateDebug = tr.query(By.css('.device-date'));

      const uidElement: HTMLElement = uidDebug.nativeElement;
      expect(uidElement.textContent).toEqual(deviceList[i].uid.toString());

      const vendorElement: HTMLElement = vendorDebug.nativeElement;
      expect(vendorElement.textContent).toEqual(deviceList[i].vendor);

      const statusElement: HTMLElement = statusDebug.nativeElement;
      const status = deviceList[i].status ? 'online' : 'offline';
      expect(statusElement.textContent).toEqual(status);

      const dateElement: HTMLElement = dateDebug.nativeElement;
      expect(dateElement.textContent).toEqual(
        formatDate(deviceList[i].dateCreated, 'medium', 'en-US')
      );
    });
  });
});
