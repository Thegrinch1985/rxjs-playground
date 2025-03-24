import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operator-visualizer',
  templateUrl: './operator-visualizer.component.html',
  styleUrls: ['./operator-visualizer.component.scss']
})
export class OperatorVisualizerComponent {
  // Accept the operator name as an input. It can be:
  // 'map', 'filter', 'tap', 'mergeMap', 'switchMap', 'shareReplay', or 'takeUntil'
  @Input() operator: string = 'map';
  // Accept the live stream numbers from the parent component.
  @Input() streamNumbers: number[] = [];

  // Common input for some operators
  multiplier: number = 2; // Used in map, switchMap, mergeMap simulations

  // For filter operator.
  filterThreshold: number = 2;

  // For take operator (if needed, though not requested now)
  takeCount: number = 5;

  // For shareReplay operator: number of values to replay.
  replayCount: number = 3;

  // For takeUntil operator: stop taking values when a value is >= this threshold.
  takeUntilThreshold: number = 30;

  // --- Computed Transformations ---

  // MAP: Multiply each stream value by multiplier.
  get mappedData(): number[] {
    return this.streamNumbers.map(x => x * this.multiplier);
  }

  // FILTER: Return only values greater than filterThreshold.
  get filteredData(): number[] {
    return this.streamNumbers.filter(x => x > this.filterThreshold);
  }

  // TAP: Simulate a side-effect (here, generating a log message per value).
  get tapLog(): string[] {
    return this.streamNumbers.map(x => `Tapped value: ${x}`);
  }

  // SWITCHMAP: Simulate by taking only the most recent value and applying multiplier.
  get switchMapData(): number {
    return this.streamNumbers.length > 0 ? this.streamNumbers[this.streamNumbers.length - 1] * this.multiplier : 0;
  }

  // MERGEMAP: Simulate by mapping each value to an inner array [x, x+multiplier] and flattening.
  get mergeMapData(): number[] {
    const result: number[] = [];
    this.streamNumbers.forEach(x => {
      result.push(x, x + this.multiplier);
    });
    return result;
  }

  // SHARE_REPLAY: Simulate by returning the last replayCount values of the stream.
  get shareReplayData(): number[] {
    return this.streamNumbers.slice(-this.replayCount);
  }

  // TAKE_UNTIL: Simulate by taking stream values until a value is encountered that is >= takeUntilThreshold.
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
}
