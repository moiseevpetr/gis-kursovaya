import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthorizationContract } from "../models/authorization.contract";
import { RegistrationContract } from "../models/registration.contract";
import { User } from "../models/user";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  example: string = '/assets/data/authorization.txt'; // Из файла

  private url = "/authorization/";

  public currentUser: User;

  constructor(private http: HttpClient) {
  }

  logIn(auth: AuthorizationContract): Observable<boolean> {
    return this.http.put<boolean>(this.url + '/auth', auth);
    //return this.http.get(this.example)
    //  .pipe(
    //    map(user => {
    //      if (user) {
    //        this.currentUser = {id:'', name: 'User', email: '', userRole: 3};
    //        return true;
    //      }
    //      else {
    //        this.currentUser = null;
    //        return false;
    //      }
    //    })
    //  );
  }

  logOut(): Observable<any> {
    this.currentUser = null;
    return this.http.get<boolean>(this.url + '/out');
    //return this.http.get(this.example);
  }

  signIn(reg: RegistrationContract): Observable<boolean> {
    return this.http.put<boolean>(this.url + '/reg', reg);
    //return this.http.get(this.example)
    //  .pipe(
    //    map(user => {
    //      if (user) {
    //        this.currentUser = {id:'', name: reg.name, email: reg.email, userRole: 3};
    //        return true;
    //      }
    //      else {
    //        this.currentUser = null;
    //        return false;
    //      }
    //    })
    //  );
  }
}
