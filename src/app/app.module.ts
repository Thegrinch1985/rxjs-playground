import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsVisualizerComponent } from './rxjs-visualizer/rxjs-visualizer.component';
import { HomeComponent } from './home/home.component';
import { OperatorVisualizerComponent } from './operator-visualizer/operator-visualizer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RxjsVisualizerComponent,
    HomeComponent,
    OperatorVisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
