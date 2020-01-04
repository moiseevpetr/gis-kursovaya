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
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ArtObjectDetailsComponent } from './components/art-object-details/art-object-details.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { AddObjectFormComponent } from './components/add-object-form/add-object-form.component';
import { EditObjectFormComponent } from './components/edit-object-form/edit-object-form.component';
import { DeleteObjectFormComponent } from './components/delete-object-form/delete-object-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RequestListComponent } from './components/request-list/request-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    ArtObjectDetailsComponent,
    AuthorizationFormComponent,
    RegistrationFormComponent,
    AddObjectFormComponent,
    EditObjectFormComponent,
    DeleteObjectFormComponent,
    UserDetailsComponent,
    RequestListComponent
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
        MatInputModule,
        MatSelectModule,
        MatTableModule
    ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
    AddObjectFormComponent,
    EditObjectFormComponent,
    DeleteObjectFormComponent,
    UserDetailsComponent
  ]
})
export class AppModule { }
