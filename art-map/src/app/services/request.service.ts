import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Request } from "../models/request";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  examples: string = '/assets/data/request.json';

  private url = "/request/";

  constructor(private http: HttpClient) {
  }

  addRequest(request: Request): Observable<any> {
    return this.http.put<Request>(this.url, request);
    //return this.http.get<Request>(this.examples);
  }
}
