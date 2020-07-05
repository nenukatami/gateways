import { Component, OnInit, Input } from '@angular/core';
import { Gateway } from '../../models/gateway';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gateway-detail',
  templateUrl: './gateway-detail.component.html',
  styleUrls: ['./gateway-detail.component.scss'],
})
export class GatewayDetailComponent implements OnInit {
  @Input() gateway: Gateway;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
