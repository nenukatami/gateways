import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../devices/models/device';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDeviceComponent } from './modals/add-device/add-device.component';
import { DeviceService } from './services/device.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  providers: [NgbModal],
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  @Input() devices: Device[];
  @Input() gatewayId: string;
  serverError: String = '';

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {}

  addDevice(): void {
    const modalRef = this.modalService.open(AddDeviceComponent);
    modalRef.componentInstance.gatewayId = this.gatewayId;
    modalRef.result
      .then((data) => {
        this.devices.push(data);
      })
      .catch(() => {});
  }

  deleteDevice(id: string): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.data = 'Do you want to delete the device?';
    modalRef.result
      .then(() => {
        this.deleteDeviceAction(id);
      })
      .catch(() => {});
  }

  deleteDeviceAction(id: string): void {
    this.deviceService.removeDevice(this.gatewayId, id).subscribe(
      (dev) => {
        this.devices = this.devices.filter((d) => {
          return d._id.toString() !== id;
        });
      },
      (reason) => {
        this.serverError = reason;
        console.log(reason);
      }
    );
  }
}
