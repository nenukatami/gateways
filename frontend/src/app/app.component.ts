import { Component } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GATEWAYS';

  constructor(config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
