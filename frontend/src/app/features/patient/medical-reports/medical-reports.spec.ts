import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReports } from './medical-reports';

describe('MedicalReports', () => {
  let component: MedicalReports;
  let fixture: ComponentFixture<MedicalReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalReports],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
