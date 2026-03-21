import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConsultation } from './video-consultation';

describe('VideoConsultation', () => {
  let component: VideoConsultation;
  let fixture: ComponentFixture<VideoConsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoConsultation],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoConsultation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
