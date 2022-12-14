import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderStatisticsComponent } from './admin-order-statistics.component';

describe('AdminOrderStatisticsComponent', () => {
  let component: AdminOrderStatisticsComponent;
  let fixture: ComponentFixture<AdminOrderStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
