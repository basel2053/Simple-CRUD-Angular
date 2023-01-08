import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL = 'http://localhost:3000/users';
  constructor(private Client: HttpClient) {}
  getAllUsers() {
    return this.Client.get(this.baseURL);
  }
  getUser(id: any) {
    return this.Client.get(`${this.baseURL}/${id}`);
  }
  addUser(user: any) {
    return this.Client.post(this.baseURL, user);
  }
  deleteUser(id: any) {
    return this.Client.delete(`${this.baseURL}/${id}`);
  }
  updateUser(id: any, user: any) {
    return this.Client.put(`${this.baseURL}/${id}`, user);
  }
}
