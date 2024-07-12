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
  focusedUUID: string = '';

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    this.treeService.initializeNodes(this.treeData);
    this.treeService.nodes$.subscribe(nodes => {
      this.nodes = nodes;
      this.filteredNodes = nodes;
    });
    this.treeService.focusedNode$.subscribe(uuid => {
      this.focusedUUID = uuid ?? '';
    })
  }

  searchNodes(): void {
    this.filteredNodes = this.treeService.searchNodes(this.searchTerm);
  }

  onNodeSelected(uuid: string): void {
    this.treeService.updateSelectedNode(uuid)
  }

  // onNodeSelected(selectedNode: TreeNode): void {
    
  //   this.treeService.selectNode(selectedNode);
  // }

  onNodeUpdated(updatedNode: TreeNode): void {
    updatedNode['modifiedBy'] = 'User 1';
    this.treeService.updateNode(updatedNode);
  }
}