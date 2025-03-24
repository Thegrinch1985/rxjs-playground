import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RxjsVisualizerComponent } from './rxjs-visualizer/rxjs-visualizer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'visualizer', component: RxjsVisualizerComponent },
  { path: '**', redirectTo: 'home' } // Redirect any unknown route to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
