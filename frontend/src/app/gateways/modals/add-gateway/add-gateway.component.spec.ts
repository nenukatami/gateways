import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGatewayComponent } from './add-gateway.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGatewayService } from './services/add-gateway.service';

describe('AddGatewayComponent', () => {
  let component: AddGatewayComponent;
  let fixture: ComponentFixture<AddGatewayComponent>;
  //
  let activeModalStub: Partial<NgbActiveModal>;
  activeModalStub = {};
  let addGatewayServiceStub: Partial<AddGatewayService>;
  addGatewayServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddGatewayComponent],
      providers: [
        { provide: NgbActiveModal, useValue: activeModalStub },
        { provide: AddGatewayService, useValue: addGatewayServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
