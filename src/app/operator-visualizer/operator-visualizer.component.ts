import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operator-visualizer',
  templateUrl: './operator-visualizer.component.html',
  styleUrls: ['./operator-visualizer.component.scss']
})
export class OperatorVisualizerComponent {
  // Accept the operator name as an input. It can be 'map', 'filter', 'tap', 'merge', or 'take'.
  @Input() operator: string = 'map';
  // Accept the live stream numbers from the parent component.
  @Input() streamNumbers: number[] = [];

  // For the map operator: acts as the multiplier.
  multiplier: number = 2;
  // For the filter operator: acts as the threshold.
  filterThreshold: number = 2;
  // For the take operator: number of values to take from the stream.
  takeCount: number = 5;

  // A static secondary stream for demonstration of the merge operator.
  secondStream: number[] = [100, 200, 300];

  // --- Computed Results ---

  // Map: Multiply each value by the provided multiplier.
  get mappedData(): number[] {
    return this.streamNumbers.map(x => x * this.multiplier);
  }

  // Filter: Return only values greater than the provided threshold.
  get filteredData(): number[] {
    return this.streamNumbers.filter(x => x > this.filterThreshold);
  }

  // Tap: For demonstration, we simulate a side effect by generating a log message for each value.
  get tapLog(): string[] {
    return this.streamNumbers.map(x => `Tapped value: ${x}`);
  }

  // Merge: Interleave the live stream with the static second stream.
  get mergedData(): number[] {
    const merged: number[] = [];
    const maxLength = Math.max(this.streamNumbers.length, this.secondStream.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < this.streamNumbers.length) {
        merged.push(this.streamNumbers[i]);
      }
      if (i < this.secondStream.length) {
        merged.push(this.secondStream[i]);
      }
    }
    return merged;
  }

  // Take: Return only the first N values from the stream.
  get takenData(): number[] {
    return this.streamNumbers.slice(0, this.takeCount);
  }
}
