import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentTheme: string = '';
  ngOnInit(): void {
    if (
      localStorage['theme'] === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      this.currentTheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      this.currentTheme = 'light';
    }
  }
  changeTheme() {
    document.documentElement.classList.toggle('dark');
    if (this.currentTheme == 'light') {
      this.currentTheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      this.currentTheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }
}
