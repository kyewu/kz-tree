import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeComponent } from './tree/tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kz-tree';

  treeData = [
    {
      id: '1',
      title: 'parent 1',
      children: [
        {
          id: '1-1',
          title: 'parent 1-0',
          children: [
            { id: '1-1-1', title: 'leaf 1-0-0' },
            { id: '1-1-2', title: 'leaf 1-0-1' }
          ]
        },
        {
          id: '1-2',
          title: 'parent 1-1',
          children: [
            { id: '1-2-1', title: 'leaf 1-1-0' }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'parent 2',
      children: [
        {
          id: '2-1',
          title: 'parent 2-0',
          children: [
            { id: '1-1-1', title: 'leaf 2-0-0' }  // 具有相同 id 的节点
          ]
        }
      ]
    }
  ];
}
