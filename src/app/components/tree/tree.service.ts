import { BehaviorSubject, Subject } from "rxjs";
import { TreeNode } from "./tree-node.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private nodesSubject = new BehaviorSubject<TreeNode[]>([]);
  nodes$ = this.nodesSubject.asObservable();
  constructor() {

  }

  initializeNodes(data: any[]): void {
    const nodes = data.map(item => new TreeNode(item, 1));
    this.nodesSubject.next(nodes);
  }

  searchNodes(term: string): TreeNode[] {
    if (!term) {
      return this.nodesSubject.value.map(node => {
        node.expanded = false; // Collapse all nodes when search term is empty
        return node;
      });
    }
    const result = this.filterNodes(this.nodesSubject.value, term.toLowerCase());
    return result;
  }

  private filterNodes(nodes: TreeNode[], term: string): TreeNode[] {
    const filteredNodes: TreeNode[] = [];

    nodes.forEach(node => {
      const filteredChildren = node.children ? this.filterNodes(node.children, term) : [];
      if (node.displayName?.toLowerCase().includes(term) || filteredChildren.length > 0) {
        const newNode = { ...node, children: filteredChildren, expanded: true };
        filteredNodes.push(newNode);
      }
    });

    return filteredNodes;
  }

  selectNode(selectedNode: TreeNode): void {
    const nodes = this.nodesSubject.value;
    this.updateSelection(nodes, selectedNode);
    this.nodesSubject.next(nodes);
  }

  deselectNode(node: TreeNode): void {
    node.selected = false;
    if (node.children) {
      node.children.forEach(child => this.deselectNode(child));
    }
  }

  private updateSelection(nodes: TreeNode[], selectedNode: TreeNode): void {
    nodes?.forEach(node => {
      this.deselectNode(node);
      if (selectedNode.uuid === node.uuid) {
        node.selected = true;
      }

      if (node.children) {
        this.updateSelection(node.children, selectedNode);
      }
    });
  }

  updateNode(updatedNode: TreeNode): void {
    const nodes = this.nodesSubject.value;
    this.updateNodeDataRecursive(nodes, updatedNode);
    this.nodesSubject.next(nodes);
  }

  /**
   * Recursively updates the data of a node in a tree structure.
   *
   * @param {TreeNode[]} nodes - The array of nodes in the tree.
   * @param {TreeNode} updatedNode - The node with updated data.
   * @return {void} This function does not return anything.
   */
  private updateNodeDataRecursive(nodes: TreeNode[], updatedNode: TreeNode): void {
    nodes.forEach(node => {
      if (node.id === updatedNode.id) {
        for (const key in updatedNode) {
          if (key !== 'children' && key !== 'level' && key !== 'uuid') {
            node[key] = updatedNode[key];
          }
        }
      }
      if (node.children) {
        this.updateNodeDataRecursive(node.children, updatedNode);
      }
    });
  }

  /**if use checkbox*/
  // selectNode(selectedNode: TreeNode): void {
  //   const nodes = this.nodesSubject.value;
  //   this.updateSelection(nodes, selectedNode);
  //   this.nodesSubject.next(nodes);
  // }

  // private updateSelection(nodes: TreeNode[], selectedNode: TreeNode): void {
  //   nodes.forEach(node => {
  //     if (node.id === selectedNode.id) {
  //       node.selected = selectedNode.selected;
  //     }
  //     if (node.parentId === selectedNode.parentId && node.id !== selectedNode.id) {
  //       node.selected = false;
  //     }
  //     if (node.children) {
  //       this.updateSelection(node.children, selectedNode);
  //     }
  //   });
  // }
}