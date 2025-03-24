import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsVisualizerComponent } from './rxjs-visualizer.component';

describe('RxjsVisualizerComponent', () => {
  let component: RxjsVisualizerComponent;
  let fixture: ComponentFixture<RxjsVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxjsVisualizerComponent]
    });
    fixture = TestBed.createComponent(RxjsVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
