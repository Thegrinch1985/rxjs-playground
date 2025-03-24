import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-operator-visualizer',
  templateUrl: './operator-visualizer.component.html',
  styleUrls: ['./operator-visualizer.component.scss']
})
export class OperatorVisualizerComponent implements OnChanges {
  @Input() operator: string = 'map';
  @Input() streamNumbers: number[] = [];
  @Output() outputStreamChange = new EventEmitter<number[]>();

  // Common input for operator configurations
  multiplier: number = 2;
  filterThreshold: number = 2;
  replayCount: number = 3;
  takeUntilThreshold: number = 30;
  takeCount: number = 5;

  // Computed Transformations

  // Map: Multiply each stream value by multiplier.
  get mappedData(): number[] {
    return this.streamNumbers.map(x => x * this.multiplier);
  }

  // Filter: Only values greater than filterThreshold.
  get filteredData(): number[] {
    return this.streamNumbers.filter(x => x > this.filterThreshold);
  }

  // Tap: Simulate side-effect logging.
  get tapLog(): string[] {
    return this.streamNumbers.map(x => `Tapped value: ${x}`);
  }

  // switchMap: Use the most recent value and apply multiplier.
  get switchMapData(): number {
    return this.streamNumbers.length > 0 ? this.streamNumbers[this.streamNumbers.length - 1] * this.multiplier : 0;
  }

  // mergeMap: Map each value to an array [x, x+multiplier] and flatten.
  get mergeMapData(): number[] {
    const result: number[] = [];
    this.streamNumbers.forEach(x => {
      result.push(x, x + this.multiplier);
    });
    return result;
  }

  // shareReplay: Return the last replayCount values.
  get shareReplayData(): number[] {
    return this.streamNumbers.slice(-this.replayCount);
  }

  // takeUntil: Take values until one is ≥ takeUntilThreshold.
  get takeUntilData(): number[] {
    const result: number[] = [];
    for (const x of this.streamNumbers) {
      if (x >= this.takeUntilThreshold) {
        break;
      }
      result.push(x);
    }
    return result;
  }

  // Determine the output stream based on the selected operator.
  get outputStream(): number[] {
    switch (this.operator) {
      case 'map':
        return this.mappedData;
      case 'filter':
        return this.filteredData;
      case 'tap':
        return this.streamNumbers; // tap does not modify the stream.
      case 'switchMap':
        return [this.switchMapData];
      case 'mergeMap':
        return this.mergeMapData;
      case 'shareReplay':
        return this.shareReplayData;
      case 'takeUntil':
        return this.takeUntilData;
      default:
        return [];
    }
  }

  // Emit the computed output stream to the parent.
  emitOutputStream(): void {
    this.outputStreamChange.emit(this.outputStream);
  }

  // Whenever an input property changes, update the output stream.
  ngOnChanges(changes: SimpleChanges): void {
    this.emitOutputStream();
  }
}
