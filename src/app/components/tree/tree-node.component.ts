import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TreeNode } from './tree-node.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeService } from './tree.service';

@Component({
  selector: 'tree-node',
  standalone: true,
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TreeNodeComponent{
  
  @Input() node!: TreeNode;
  @Input() focusedUUID!: string;
  @Output() nodeSelected = new EventEmitter<string>();
  @Output() nodeUpdated = new EventEmitter<TreeNode>();

  constructor(private treeService: TreeService) {}

  toggleExpand(): void {
    this.node.expanded = !this.node.expanded;
  }

  selectNode(): void {
    // this.focusedUUID = this.node.uuid;
    this.nodeSelected.emit(this.node.uuid);
  }

  updateNode(): void {
    // Update logic here, then emit the updated node
    this.nodeUpdated.emit(this.node);
  }
}