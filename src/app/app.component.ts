import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeComponent } from './components/tree/tree.component';
import { DATA } from './components/tree/data';
import { SplitterComponent } from './components/splitter/splitter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TreeComponent, SplitterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kz-tree';
  treeData = DATA;
  
}
