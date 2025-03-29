import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressBookService } from 'src/app/services/address-book.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-person-address-form',
  templateUrl: './person-address-form.component.html',
  styleUrls: ['./person-address-form.component.scss']
})
export class PersonAddressFormComponent {
  personForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private addressBookService: AddressBookService,
    private router: Router
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const contactData = this.personForm.value;

      this.addressBookService.addContact(contactData).subscribe(
        () => {
          this.message = 'Contact added successfully!';
          this.personForm.reset();
        },
        (error: any) => {
          this.errorMessage = 'Failed to add contact. Please try again.';
        }
      );
    }
  }

  resetForm() {
    this.personForm.reset();
    this.message = '';
    this.errorMessage = '';
  }

  closeForm() {
    this.router.navigate(['/addressBook']);
  }
}
