import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://restapi-node-postgresql-hmhahch6eyg4c6da.brazilsouth-01.azurewebsites.net/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    //this.cookieService.delete('authToken', '/');
  }

  isAuthenticated() { // : boolean
    //return this.cookieService.check('authToken');
  }
}