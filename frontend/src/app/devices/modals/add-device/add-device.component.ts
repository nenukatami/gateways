import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddDeviceService } from './services/add-device.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit {
  @Input() gatewayId: string;
  deviceData = {
    uid: '',
    vendor: '',
    status: false,
  };
  deviceForm: FormGroup;
  serverError: string;

  constructor(
    public activeModal: NgbActiveModal,
    private addDeviceService: AddDeviceService
  ) {}

  ngOnInit(): void {
    this.deviceForm = new FormGroup({
      uid: new FormControl(this.deviceData.uid, [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      vendor: new FormControl(this.deviceData.vendor),
      status: new FormControl(this.deviceData.status),
    });
  }

  get uid() {
    return this.deviceForm.get('uid');
  }

  submitDevice(): void {
    this.addDeviceService
      .addDevice(this.gatewayId, this.deviceForm.value)
      .subscribe(
        (dev) => {
          this.activeModal.close(dev);
        },
        (reason) => {
          this.serverError = reason;
          console.log(reason);
        }
      );
  }
}
