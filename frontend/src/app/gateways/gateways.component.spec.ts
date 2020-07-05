import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysComponent } from './gateways.component';
import { GatewayService } from './services/gateway.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Gateway } from './models/gateway';

describe('GatewaysComponent', () => {
  let component: GatewaysComponent;
  let fixture: ComponentFixture<GatewaysComponent>;
  let gatewayList: Gateway[] = [
    {
      _id: '5efa27b8577418e686b64eb7',
      name: 'Gateway 1',
      ipv: '192.168.1.3',
      serialNumber: '94-10-3001',
    },
    {
      _id: '5efa27b8577418e686b64eb8',
      name: 'Gateway 2',
      ipv: '192.168.1.4',
      serialNumber: '94-10-3001',
    },
    {
      _id: '5efa27b8577418e686b64eb9',
      name: 'Gateway 3',
      ipv: '192.168.1.3',
      serialNumber: '94-10-3001',
    },
  ];

  //
  let gatewayServiceStub: Partial<GatewayService>;
  gatewayServiceStub = {
    getGateways: () => {
      return of(gatewayList);
    },
  };
  let modalService: Partial<NgbModal>;
  modalService = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GatewaysComponent],
      providers: [
        { provide: GatewayService, useValue: gatewayServiceStub },
        { provide: modalService, useValue: modalService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list gateways correctly', () => {
    const gatewayListDebug: DebugElement = fixture.debugElement;
    const liDebug = gatewayListDebug.queryAll(
      By.css('.gateway-component-list li')
    );
    expect(liDebug.length).toBe(3);

    liDebug.forEach((li, i) => {
      const spanDebug = li.query(By.css('.gateway-name'));
      const spanElement: HTMLElement = spanDebug.nativeElement;
      expect(spanElement.textContent).toEqual(gatewayList[i].name);
    });
  });
});
