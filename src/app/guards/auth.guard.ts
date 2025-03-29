import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router); 

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
