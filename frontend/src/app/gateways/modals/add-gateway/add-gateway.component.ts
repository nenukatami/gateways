import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddGatewayService } from './services/add-gateway.service';

@Component({
  selector: 'app-add-gateway',
  templateUrl: './add-gateway.component.html',
  styleUrls: ['./add-gateway.component.scss'],
})
export class AddGatewayComponent implements OnInit {
  gatewayData = {
    name: '',
    ipv: '',
    serialNumber: '',
  };
  gatewayForm: FormGroup;
  serverError: string;

  constructor(
    public activeModal: NgbActiveModal,
    private addGatewayService: AddGatewayService
  ) {}

  ngOnInit(): void {
    this.gatewayForm = new FormGroup({
      ipv: new FormControl(this.gatewayData.ipv, [
        Validators.required,
        Validators.pattern(
          /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
        ),
      ]),
      name: new FormControl(this.gatewayData.name),
      serialNumber: new FormControl(this.gatewayData.serialNumber),
    });
  }

  get ipv() {
    return this.gatewayForm.get('ipv');
  }

  submitGateway(): void {
    this.addGatewayService.addGateway(this.gatewayForm.value).subscribe(
      (gat) => {
        this.activeModal.close(gat);
      },
      (reason) => {
        this.serverError = reason;
        console.log(reason);
      }
    );
  }
}
