import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  students: any;
  constructor(private clientService: ApiService) {}
  ngOnInit(): void {
    this.clientService.getAllUsers().subscribe({
      next: (res) => {
        this.students = res;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  deleteUser(e: MouseEvent, name: any, id: any) {
    if (confirm(`Are you sure you want to delete the user ${name} ?`)) {
      this.clientService.deleteUser(id).subscribe();
      (e.currentTarget as HTMLElement).parentElement?.parentElement?.remove();
    }
  }
}
