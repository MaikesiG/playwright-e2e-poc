import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  category: string;
  price: string;
  status: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  filterName = '';
  filterCategory = '';
  filtered: Product[] = [];

  private all: Product[] = [
    { name: 'Apple', category: 'fruit', price: '$1.20', status: 'In Stock' },
    { name: 'Banana', category: 'fruit', price: '$0.50', status: 'In Stock' },
    { name: 'Carrot', category: 'veggie', price: '$0.80', status: 'Low Stock' },
    { name: 'Grape', category: 'fruit', price: '$2.50', status: 'In Stock' },
    {
      name: 'Mango',
      category: 'fruit',
      price: '$1.80',
      status: 'Out of Stock',
    },
    { name: 'Onion', category: 'veggie', price: '$0.60', status: 'In Stock' },
    { name: 'Peach', category: 'fruit', price: '$1.50', status: 'In Stock' },
  ];

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter() {
    this.filtered = this.all.filter(
      (p) =>
        p.name.toLowerCase().includes(this.filterName.toLowerCase()) &&
        (this.filterCategory === '' || p.category === this.filterCategory),
    );
  }

  statusClass(s: string) {
    return 'status-' + s.toLowerCase().replace(' ', '-');
  }
}
