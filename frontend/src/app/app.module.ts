import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { DevicesComponent } from './devices/devices.component';
import { GatewayDetailComponent } from './gateways/modals/gateway-detail/gateway-detail.component';
import { AddGatewayComponent } from './gateways/modals/add-gateway/add-gateway.component';
import { AddDeviceComponent } from './devices/modals/add-device/add-device.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GatewaysComponent,
    DevicesComponent,
    GatewayDetailComponent,
    AddDeviceComponent,
    AddGatewayComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
