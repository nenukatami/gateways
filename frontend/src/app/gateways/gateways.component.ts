import { Component, OnInit } from '@angular/core';
import { Gateway } from './models/gateway';
import { GatewayService } from './services/gateway.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayDetailComponent } from './modals/gateway-detail/gateway-detail.component';
import { AddGatewayComponent } from './modals/add-gateway/add-gateway.component';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss'],
})
export class GatewaysComponent implements OnInit {
  gateways: Gateway[];
  serverError: String = '';
  selectedGateway: Gateway;

  constructor(
    private gatewayService: GatewayService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getGateways();
  }

  getGateways(): void {
    this.gatewayService.getGateways().subscribe(
      (gateways) => (this.gateways = gateways),
      (reason) => {
        this.serverError = reason;
        console.log(reason);
      }
    );
  }

  showDetails(gateway: Gateway): void {
    const modalRef = this.modalService.open(GatewayDetailComponent);
    modalRef.componentInstance.gateway = gateway;
  }

  showGatewayDevices(gatewayId: string, index: number): void {
    this.gatewayService.getDevices(gatewayId).subscribe(
      (devices) => {
        this.gateways[index]['devices'] = devices;
      },
      (reason) => {
        this.serverError = reason;
        console.log(reason);
      }
    );
  }

  addGateway(): void {
    const modalRef = this.modalService.open(AddGatewayComponent);
    modalRef.result
      .then((data) => {
        this.gateways.push(data);
      })
      .catch(() => {});
  }
}
