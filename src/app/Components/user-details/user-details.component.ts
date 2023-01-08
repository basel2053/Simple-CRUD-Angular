import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../Services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [],
})
export class UserDetailsComponent implements OnInit {
  student: any;
  ID = 0;
  constructor(
    private clientService: ApiService,
    myActiveRoute: ActivatedRoute
  ) {
    this.ID = myActiveRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.clientService.getUser(this.ID).subscribe({
      next: (res) => {
        this.student = res;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
