import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string): Observable<any> {
    const url = `http://localhost:9000/api/v1/auth/authenticate`;
    const data = { email: email, password: password }; 
    return this.http.post<any>(url, data);
  }



}
