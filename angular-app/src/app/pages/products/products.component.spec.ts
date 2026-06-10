import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all 7 products by default', () => {
    expect(component.filtered.length).toBe(7);
  });

  it('should filter by name', () => {
    component.filterName = 'apple';
    component.applyFilter();
    expect(component.filtered.length).toBe(1);
    expect(component.filtered[0].name).toBe('Apple');
  });

  it('should filter by category fruit', () => {
    component.filterCategory = 'fruit';
    component.applyFilter();
    expect(component.filtered.every((p) => p.category === 'fruit')).toBeTrue();
  });

  it('should filter by category veggie', () => {
    component.filterCategory = 'veggie';
    component.applyFilter();
    expect(component.filtered.every((p) => p.category === 'veggie')).toBeTrue();
    expect(component.filtered.length).toBe(2);
  });

  it('should return empty when no match', () => {
    component.filterName = 'zzznomatch';
    component.applyFilter();
    expect(component.filtered.length).toBe(0);
  });

  it('should combine name and category filter', () => {
    component.filterName = 'a';
    component.filterCategory = 'fruit';
    component.applyFilter();
    expect(component.filtered.every((p) => p.category === 'fruit')).toBeTrue();
    expect(
      component.filtered.every((p) => p.name.toLowerCase().includes('a')),
    ).toBeTrue();
  });

  it('should return correct statusClass', () => {
    expect(component.statusClass('In Stock')).toBe('status-in-stock');
    expect(component.statusClass('Low Stock')).toBe('status-low-stock');
    expect(component.statusClass('Out of Stock')).toBe('status-out-of-stock');
  });
});
