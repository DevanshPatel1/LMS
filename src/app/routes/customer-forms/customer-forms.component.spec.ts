import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormsComponent } from './customer-forms.component';

describe('CustomerFormsComponent', () => {
  let component: CustomerFormsComponent;
  let fixture: ComponentFixture<CustomerFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
