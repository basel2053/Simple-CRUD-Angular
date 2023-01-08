import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  changeTheme() {
    document.documentElement.classList.toggle('dark');
  }
}
