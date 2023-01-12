import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: [],
})
export class AddUserComponent implements OnInit {
  ID = 0;
  user: any;
  constructor(
    private clientService: ApiService,
    myActiveRoute: ActivatedRoute
  ) {
    this.ID = myActiveRoute.snapshot.params['id'];
  }

  get validName() {
    return this.validationForm.controls['name'].valid;
  }
  get validAge() {
    return this.validationForm.controls['age'].valid;
  }
  get validEmail() {
    return this.validationForm.controls['email'].valid;
  }

  validationForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(4), Validators.required]),
    age: new FormControl('', [
      Validators.min(20),
      Validators.max(40),
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.required,
    ]),
    city: new FormControl('', []),
    blockNo: new FormControl('', []),
    phone: new FormControl('', []),
  });

  ngOnInit(): void {
    if (this.ID) {
      this.clientService.getUser(this.ID).subscribe({
        next: (res) => {
          this.user = res;
          this.validationForm = new FormGroup({
            name: new FormControl(this.user.name, [
              Validators.minLength(4),
              Validators.required,
            ]),
            age: new FormControl(this.user.age, [
              Validators.min(20),
              Validators.max(40),
              Validators.required,
            ]),
            email: new FormControl(this.user.email, [
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
              Validators.required,
            ]),
            city: new FormControl(this.user.address.city, []),
            blockNo: new FormControl(this.user.address.blockNo, []),
            phone: new FormControl(this.user.phone, []),
          });
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }

  addUser() {
    const user = {
      name: this.validationForm.value.name,
      email: this.validationForm.value.email,
      age: this.validationForm.value.age,
      address: {
        city: this.validationForm.value.city,
        blockNo: this.validationForm.value.blockNo,
      },
      phone: this.validationForm.value.phone,
    };
    if (this.user) {
      this.clientService.updateUser(this.ID, user).subscribe();
      return;
    }
    this.clientService.addUser(user).subscribe();
  }
}
