import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddressFormComponent } from './person-address-form.component';

describe('PersonAddressFormComponent', () => {
  let component: PersonAddressFormComponent;
  let fixture: ComponentFixture<PersonAddressFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonAddressFormComponent]
    });
    fixture = TestBed.createComponent(PersonAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
