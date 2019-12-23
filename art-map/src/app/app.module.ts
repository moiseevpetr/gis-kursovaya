import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from "@angular/common/http";
import { MarkerService } from "./services/marker.service";
import { NavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
  declarations: [
      AppComponent,
      MapComponent,
      NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
