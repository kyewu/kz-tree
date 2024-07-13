import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from './tree-node.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeNodeComponent } from './tree-node.component';
import { TreeService } from './tree.service';


@Component({
  selector: 'app-tree',
  standalone: true,
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  imports: [CommonModule,FormsModule, TreeNodeComponent]
})
export class TreeComponent implements OnInit {
  @Input() treeData: any[] = [];
  nodes: TreeNode[] = [];
  filteredNodes: TreeNode[] = [];
  searchTerm: string = '';

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    this.treeService.initializeNodes(this.treeData);
    this.treeService.nodes$.subscribe(nodes => {
      this.nodes = nodes;
      this.filteredNodes = nodes;
    });
  }

  searchNodes(): void {
    this.filteredNodes = this.treeService.searchNodes(this.searchTerm);
  }

  onNodeSelected(selectedNode: TreeNode): void {
    this.treeService.selectNode(selectedNode)
  }

  onNodeUpdated(updatedNode: TreeNode): void {
    updatedNode['modifiedBy'] = `User ${Math.floor(Math.random() * 10)}`;
    this.treeService.updateNode(updatedNode);
  }
}