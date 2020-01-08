import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Request } from "../models/request";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  example: string = '/assets/data/request';
  examples: string = '/assets/data/requests.json';

  private url = "/request/";

  constructor(private http: HttpClient) {
  }

  addRequest(request: Request): Observable<any> {
    return this.http.post<Request>(this.url, request);
    //return this.http.get(this.examples);
  }

  getRequestsForUser(userId: string): Observable<Request[]> {
    return this.http.get<Request[]>(this.url+ 'user/' + userId );
    //return this.http.get<Request[]>(this.examples);
  }

  getConsiderateRequests(): Observable<Request[]> { // request + user
    return this.http.get<Request[]>(this.url + 'active');
    /*return this.http.get<Request[]>(this.examples)
      .pipe(
        map(
          requests => {
            requests.forEach(
              r => r.user = {
                id:'5',
                name:'Username',
                email:'user@mail.com',
                userRole:1
              });
            return requests;
          }
        )
      );*/
  }

  getRequest(id: string): Observable<Request> { // request + photoRequests
    return this.http.get<Request>(this.url + id);
    /*return this.http.get<Request>(this.example + id + '.json')
      .pipe(
        map(
          request => {
            request.user = {
              id:'5',
              name:'Username',
              email:'user@mail.com',
              userRole:1
            };
            return request;
          }
        )
      );*/
  }

  acceptRequest(id: string): Observable<any> {
    return this.http.get(this.url + id + '/accept');
    //return this.http.get(this.example + id + '.json');
  }

  rejectRequest(id: string): Observable<any>  {
    return this.http.get(this.url + id + '/decline');
    //return this.http.get(this.example + id + '.json');
  }
}
