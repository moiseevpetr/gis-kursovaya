import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthorizationContract } from "../models/authorization.contract";
import { RegistrationContract } from "../models/registration.contract";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  example: string = '/assets/data/authorization.json'; // Из файла

  private url = "/authorization/";

  public currentUser: User;

  constructor(private http: HttpClient) {
  }

  logIn(auth: AuthorizationContract): Observable<boolean> {
    //return this.http.put<User>(this.url + 'auth', auth)
    return this.http.get<User>(this.example)
      .pipe(
        map(user => {
          if (user) {
            this.currentUser = user;
            return true;
          }
          else {
            this.currentUser = null;
            return false;
          }
        })
      );
  }

  logOut(): Observable<any> {
    this.currentUser = null;
    //return this.http.get<boolean>(this.url + 'out');
    return this.http.get(this.example);
  }

  signIn(reg: RegistrationContract): Observable<boolean> {
    //return this.http.put<User>(this.url + 'reg', reg)
    return this.http.get<User>(this.example)
      .pipe(
        map(user => {
          if (user) {
            this.currentUser = user;
            return true;
          }
          else {
            this.currentUser = null;
            return false;
          }
        })
      );
  }
}
