import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesFormComponent } from './licenses-form.component';

describe('LicensesFormComponent', () => {
  let component: LicensesFormComponent;
  let fixture: ComponentFixture<LicensesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicensesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
