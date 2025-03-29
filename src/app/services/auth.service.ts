import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7206/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  forgotPassword(email: string) {
    return this.http.post('https://localhost:7206/api/auth/forgot-password', { email });
  }
  
  resetPassword(newPassword: string, confirmPassword: string, token: string) {
    const url = `https://localhost:7206/api/auth/reset-password?token=${encodeURIComponent(token)}`;
  
    const body = {
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
  
    return this.http.post(url, body);
  }
  
  
}
