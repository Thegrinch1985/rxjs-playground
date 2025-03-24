import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rxjs-visualizer',
  templateUrl: './rxjs-visualizer.component.html',
  styleUrls: ['./rxjs-visualizer.component.scss']
})
export class RxjsVisualizerComponent implements OnDestroy {
  numbers: number[] = [];
  currentOperator: string = 'map'; // default operator

  // Define an array of colors for the nodes
  colors: string[] = ['#007acc', '#ff4500', '#32cd32', '#ffd700', '#ff69b4', '#8a2be2'];
  // Define the full list of operators
  operators: string[] = ['map', 'filter', 'tap', 'switchMap', 'mergeMap', 'shareReplay', 'takeUntil'];

  // Initialize with the full list
  filteredOperators: string[] = [...this.operators];
  
  // Model for the search input
  operatorSearch: string = '';

  // Store the output stream computed by the operator visualizer
  outputNumbers: number[] = [];

  private streamInterval: any; 

  constructor() {
    this.startStream();
  }

  // Starts the stream of random numbers
  startStream(): void {
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
    }
    this.streamInterval = setInterval(() => {
      // Only add a new number if there are less than 10
      if (this.numbers.length < 10) {
        const randomNumber = Math.floor(Math.random() * 50);
        this.numbers.push(randomNumber);
      } else {
        // Stop the stream when ten numbers are reached
        clearInterval(this.streamInterval);
      }
    }, 1000);
  }

  // Reset the numbers array and restart the stream
  resetNumbers(): void {
    this.numbers = [];
    this.startStream();
  }

  // When selecting an operator, reset numbers and update the operator.
  selectOperator(operator: string): void {
    this.resetNumbers();
    this.currentOperator = operator;
  }

  // Filter the operator list based on the search input.
  filterOperators(): void {
    const searchTerm = this.operatorSearch.toLowerCase();
    this.filteredOperators = this.operators.filter(op => op.toLowerCase().includes(searchTerm));
  }

  // Handler to receive the transformed output stream from the operator component.
  handleOutputStream(newStream: number[]): void {
    this.outputNumbers = newStream;
  }

  // Clear the interval when the component is destroyed.
  ngOnDestroy(): void {
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
    }
  }
}
