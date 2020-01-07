import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthorizationContract } from "../models/authorization.contract";
import { RegistrationContract } from "../models/registration.contract";
import { User } from "../models/user";
import { TokenContract } from "../models/token.contract";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  example: string = '/assets/data/authorization.json'; // Из файла

  private registerUrl = "/register/";
  private tokenUrl = "/token";

  public currentUser: User;
  public token: string;

  constructor(private http: HttpClient) {
  }

  logIn(auth: AuthorizationContract): Observable<boolean> {
    return this.http.post<TokenContract>(this.tokenUrl, auth)
    //return this.http.get<User>(this.example)
      .pipe(
        map(tokenContract => {
          if (tokenContract) {
            this.currentUser = {
              id: tokenContract.userId,
              name: tokenContract.userName,
              email: tokenContract.email,
              userRole: tokenContract.userRole,
            };
            this.token = tokenContract.accessToken;

            return true;
          }
          else {
            this.currentUser = null;
            this.token = null;

            return false;
          }
        })
      );
  }

  logOut() {
    this.currentUser = null;
    //return this.http.get<boolean>(this.url + 'out');
    //return this.http.get(this.example);
  }

  signIn(reg: RegistrationContract): Observable<boolean> {
    return this.http.post<User>(this.registerUrl, reg)
    //return this.http.get<User>(this.example)
      .pipe(
        map(user => {
          if (user) {
            alert('Пользователь успешно зарегистрирован.');
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
