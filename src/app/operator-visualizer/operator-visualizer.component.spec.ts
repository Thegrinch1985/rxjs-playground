import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorVisualizerComponent } from './operator-visualizer.component';

describe('OperatorVisualizerComponent', () => {
  let component: OperatorVisualizerComponent;
  let fixture: ComponentFixture<OperatorVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorVisualizerComponent]
    });
    fixture = TestBed.createComponent(OperatorVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
