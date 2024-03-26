import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialKeyGenerationComponent } from './serial-key-generation.component';

describe('SerialKeyGenerationComponent', () => {
  let component: SerialKeyGenerationComponent;
  let fixture: ComponentFixture<SerialKeyGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerialKeyGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerialKeyGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
