import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeptsComponent } from './admin-depts.component';

describe('AdminDeptsComponent', () => {
  let component: AdminDeptsComponent;
  let fixture: ComponentFixture<AdminDeptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDeptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
