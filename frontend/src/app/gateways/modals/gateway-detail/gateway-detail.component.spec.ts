import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayDetailComponent } from './gateway-detail.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Gateway } from '../../models/gateway';

describe('GatewayDetailComponent', () => {
  let component: GatewayDetailComponent;
  let fixture: ComponentFixture<GatewayDetailComponent>;
  //
  let activeModalStub: Partial<NgbActiveModal>;
  activeModalStub = {};
  let gatewayData: Gateway = {
    _id: '5efa27b8577418e686b64eb9',
    name: 'gateway name',
    serialNumber: '94-05-01',
    ipv: '192.168.1.100',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GatewayDetailComponent],
      providers: [{ provide: NgbActiveModal, useValue: activeModalStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayDetailComponent);
    component = fixture.componentInstance;
    // mocking input data
    component.gateway = gatewayData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <div class="modal-body"> with gateway info', () => {
    const modelDebug: DebugElement = fixture.debugElement;
    const divsDebug = modelDebug.queryAll(By.css('.modal-body div'));

    const div1: HTMLElement = divsDebug[0].nativeElement;
    const div2: HTMLElement = divsDebug[1].nativeElement;
    const div3: HTMLElement = divsDebug[2].nativeElement;

    expect(div1.textContent).toContain(
      `Name: ${gatewayData.name.toUpperCase()}`
    );
    expect(div2.textContent).toContain(
      `Serial Number: ${gatewayData.serialNumber}`
    );
    expect(div3.textContent).toContain(`IPv4: ${gatewayData.ipv}`);
  });
});
