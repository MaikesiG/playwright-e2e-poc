import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  keyword = '';
  results: string[] = [];
  error = '';
  noResult = false;
  private data = [
    'Apple',
    'Banana',
    'Cherry',
    'Grape',
    'Mango',
    'Orange',
    'Peach',
  ];

  search() {
    const val = this.keyword.trim();
    this.error = '';
    this.noResult = false;
    this.results = [];
    if (!val) {
      this.error = 'Please enter a keyword';
      return;
    }
    this.results = this.data.filter((d) =>
      d.toLowerCase().includes(val.toLowerCase()),
    );
    if (this.results.length === 0) this.noResult = true;
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') this.search();
  }
}
