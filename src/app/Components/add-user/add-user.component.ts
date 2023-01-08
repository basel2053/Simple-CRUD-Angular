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
  student: any;
  constructor(
    private clientService: ApiService,
    myActiveRoute: ActivatedRoute
  ) {
    this.ID = myActiveRoute.snapshot.params['id'];
  }
  validationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', []),
    email: new FormControl('', []),
    city: new FormControl('', []),
    blockNo: new FormControl('', []),
    phone: new FormControl('', []),
  });

  ngOnInit(): void {
    if (this.ID) {
      this.clientService.getUser(this.ID).subscribe({
        next: (res) => {
          this.student = res;
          this.validationForm = new FormGroup({
            name: new FormControl(this.student.name, [Validators.required]),
            age: new FormControl(this.student.age, []),
            email: new FormControl(this.student.email, []),
            city: new FormControl(this.student.address.city, []),
            blockNo: new FormControl(this.student.address.blockNo, []),
            phone: new FormControl(this.student.phone, []),
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
    if (this.student) {
      this.clientService.updateUser(this.ID, user).subscribe();
      return;
    }
    this.clientService.addUser(user).subscribe();
  }
}
