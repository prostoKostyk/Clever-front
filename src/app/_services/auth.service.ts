import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = "http://localhost:8080/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + "signin", {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + "signup", {
      username: user.username,
      first_name: user.first_name,
      second_name: user.second_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}