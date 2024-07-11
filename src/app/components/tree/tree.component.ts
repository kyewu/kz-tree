import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface FlatTreeNode {
  id: string;
  title: string;
  level: number;
  expandable: boolean;
  isExpanded: boolean;
  parentId: string | null;
  children?: FlatTreeNode[];
  isLeaf: boolean;
  hasChildren: boolean;
  isSelected: boolean;
  parent: FlatTreeNode | null;
}

@Component({
  selector: 'app-tree',
  standalone: true,
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  imports: [CommonModule]
})
export class TreeComponent implements OnInit {
  @Input() treeData: any[] = [];
  nodes: FlatTreeNode[] = [];

  ngOnInit(): void {
    this.nodes = this.flattenNodes(this.treeData, 0, null);
  }

  flattenNodes(treeNodes: any[], level: number, parent: FlatTreeNode | null): FlatTreeNode[] {
    return treeNodes.reduce((acc: FlatTreeNode[], node) => {
      const flatNode: FlatTreeNode = {
        id: node.id,
        title: node.title,
        level,
        expandable: !!node.children?.length,
        isExpanded: false,
        parentId: parent ? parent.id : null,
        children: node.children,
        isLeaf: !node.children?.length,
        hasChildren: !!node.children?.length,
        isSelected: false,
        parent
      };
      return acc.concat(flatNode, node.children ? this.flattenNodes(node.children, level + 1, flatNode) : []);
    }, []);
  }

  toggleNode(node: FlatTreeNode): void {
    node.isExpanded = !node.isExpanded;
  }

  isVisible(node: FlatTreeNode): boolean {
    if (!node.parent) {
      return true;
    }
    return node.parent.isExpanded && this.isVisible(node.parent);
  }

  toggleSelection(node: FlatTreeNode): void {
    const newSelectionState = !node.isSelected;
    
    // 更新所有具有相同id的节点的选中状态
    this.syncSelectionState(node.id, newSelectionState);
    
    // 递归通知每个受影响节点的父节点更新选中状态
    const affectedNodes = this.nodes.filter(n => n.id === node.id);
    affectedNodes.forEach(n => {
      this.updateParentSelection(n.parent);
    });
  }

  syncSelectionState(id: string, isSelected: boolean): void {
    this.nodes.forEach(n => {
      if (n.id === id) {
        n.isSelected = isSelected;
      }
    });
  }

  updateParentSelection(node: FlatTreeNode | null): void {
    if (!node) {
      return;
    }

    const allChildren = this.nodes.filter(n => n.parentId === node.id);
    node.isSelected = allChildren.every(child => child.isSelected);

    // 递归更新父节点
    this.updateParentSelection(node.parent);
  }
}