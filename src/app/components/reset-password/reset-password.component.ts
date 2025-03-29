import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = ''; 
  message: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatch } // ✅ Fixed syntax
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log("Received token from URL:", this.token);
      if (!this.token) {
        this.errorMessage = "Invalid or missing token.";
      }
    });
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
      console.log("Sending reset password request:", { newPassword, confirmPassword });

      this.authService.resetPassword(newPassword, confirmPassword, this.token).subscribe(
        () => {
          this.message = 'Password reset successful!';
          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 2000);
        },
        (error: any) => {
          this.errorMessage = 'Failed to reset password. Try again.';
        }
      );
    }
  }
}
