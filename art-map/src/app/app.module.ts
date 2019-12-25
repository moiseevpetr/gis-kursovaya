import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ArtObjectService } from "./services/art-object.service";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ArtObjectDetailsComponent } from './components/art-object-details/art-object-details.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  declarations: [
      AppComponent,
      MapComponent,
      NavbarComponent,
      ArtObjectDetailsComponent,
      AuthorizationFormComponent,
      RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    ArtObjectService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AuthorizationFormComponent,
    RegistrationFormComponent
  ]
})
export class AppModule { }
