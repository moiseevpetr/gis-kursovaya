import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Request } from "../models/request";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  example: string = '/assets/data/request.json';
  examples: string = '/assets/data/requests.json';

  private url = "/request/";

  constructor(private http: HttpClient) {
  }

  addRequest(request: Request): Observable<any> {
    //return this.http.put<Request>(this.url, request);
    return this.http.get<Request>(this.example);
  }

  getRequestForUser(userId: string): Observable<Request[]> {
    //return this.http.get<Request[]>(this.url + userId + '/user');
    return this.http.get<Request[]>(this.examples);
  }

  getConsiderateRequests(): Observable<Request[]> { // request + user
    //return this.http.get<Request[]>(this.url + 'considerate');
    return this.http.get<Request[]>(this.examples)
      .pipe(
        map(
          requests => {
            requests.forEach(r => r.user = {id:'5', name:'Username', email:'user@mail.com', userRole:1});
            return requests;
          }
        )
      );
  }
}
