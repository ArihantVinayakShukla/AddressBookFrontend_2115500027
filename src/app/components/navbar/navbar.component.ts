import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    menuVisible: boolean = false;
  
    constructor(public authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  goToProfile() {
    this.router.navigateByUrl('https://localhost:7206/api/auth/profile');
    this.menuVisible = false; 
  }

  logout() {
    this.authService.logout(); 
    this.menuVisible = false; 
    this.router.navigate(['/']); 
  }
}
