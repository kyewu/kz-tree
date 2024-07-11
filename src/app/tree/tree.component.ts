import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeNode } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling'
interface Node {
  id: number;
  parentId: number;
  displayName: string;
  recipeName: string | null;
  description: string | null;
  createdDate: string;
  createdBy: string;
  modificationDate: string;
  modifiedBy: string;
  active: boolean;
  topLevel: boolean;
  recipe: boolean;
  children: Node[];
}

const DATA: Node[] = [
  {
    id: 1,
    parentId: 0,
    displayName: 'sprintBoot3.2',
    recipeName: 'org.openrewrite.java.spring.boot3.UpgradeSpringBoot_3_2',
    description: 'Upgrade to Spring Boot 3.2',
    createdDate: '2021-10-20T00:00:00.000Z',
    createdBy: 'admin',
    modificationDate: '2021-10-20T00:00:00.000Z',
    modifiedBy: 'admin',
    active: true,
    topLevel: true,
    recipe: false,
    children: [
      {
        id: 2,
        parentId: 1,
        displayName: 'JDK',
        recipeName: null,
        description: null,
        createdDate: '2021-10-20T00:00:00.000Z',
        createdBy: 'admin',
        modificationDate: '2021-10-20T00:00:00.000Z',
        modifiedBy: 'admin',
        active: true,
        topLevel: false,
        recipe: false,
        children: [
          {
            id: 3,
            parentId: 2,
            displayName: 'JDK17',
            recipeName: null,
            description: null,
            createdDate: '2021-10-20T00:00:00.000Z',
            createdBy: 'admin',
            modificationDate: '2021-10-20T00:00:00.000Z',
            modifiedBy: 'admin',
            active: true,
            topLevel: false,
            recipe: true,
            children: []
          },
          {
            id: 4,
            parentId: 2,
            displayName: 'JDK21',
            recipeName: null,
            description: null,
            createdDate: '2021-10-20T00:00:00.000Z',
            createdBy: 'admin',
            modificationDate: '2021-10-20T00:00:00.000Z',
            modifiedBy: 'admin',
            active: true,
            topLevel: false,
            recipe: true,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    parentId: 1,
    displayName: 'JDK',
    recipeName: null,
    description: null,
    createdDate: '2021-10-20T00:00:00.000Z',
    createdBy: 'admin',
    modificationDate: '2021-10-20T00:00:00.000Z',
    modifiedBy: 'admin',
    active: true,
    topLevel: false,
    recipe: false,
    children: [
      {
        id: 3,
        parentId: 2,
        displayName: 'JDK17',
        recipeName: null,
        description: null,
        createdDate: '2021-10-20T00:00:00.000Z',
        createdBy: 'admin',
        modificationDate: '2021-10-20T00:00:00.000Z',
        modifiedBy: 'admin',
        active: true,
        topLevel: false,
        recipe: true,
        children: []
      },
      {
        id: 4,
        parentId: 2,
        displayName: 'JDK21',
        recipeName: null,
        description: null,
        createdDate: '2021-10-20T00:00:00.000Z',
        createdBy: 'admin',
        modificationDate: '2021-10-20T00:00:00.000Z',
        modifiedBy: 'admin',
        active: true,
        topLevel: false,
        recipe: true,
        children: []
      }
    ]
  }
];
@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [MatTreeModule, MatCheckboxModule, MatIconModule, CommonModule, ScrollingModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {
  @ViewChildren(MatTreeNode) treeNodes!: QueryList<MatTreeNode<Node>>;
  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();
  originalData: Node[] = [];

  selectedNodes: Set<number> = new Set();
  focusedNodeId: number | null = null; // 当前获得焦点的节点ID
  constructor() {
    this.dataSource.data = DATA;
    this.originalData = DATA;
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  toggleSelection(event: Event,node: Node) {
    event.stopPropagation();
    if (this.isSelected(node)) {
      this.deselectNode(node);
    } else {
      this.selectNode(node);
    }
  }

  isSelected(node: Node): boolean {
    return this.selectedNodes.has(node.id);
  }

  selectNode(node: Node) {
    // 取消同级节点的选中状态
    this.deselectSiblingNodes(node);
    // 选中当前节点
    this.selectedNodes.add(node.id);
  }

  deselectNode(node: Node) {
    this.selectedNodes.delete(node.id);
  }

  deselectSiblingNodes(node: Node) {
    const parentNode = this.findParentNode(DATA, node.parentId);
    if (parentNode) {
      parentNode.children.forEach(child => {
        if (child.id !== node.id) {
          this.selectedNodes.delete(child.id);
        }
      });
    }
  }

  findParentNode(nodes: Node[], parentId: number): Node | null {
    for (const node of nodes) {
      if (node.id === parentId) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const parent = this.findParentNode(node.children, parentId);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }

  handleFocus(node: Node) {
    this.focusedNodeId = node.id; // 更新当前获得焦点的节点ID
  }

  focusNode(node: Node) {
    const targetNode = this.treeNodes.find(treeNode => treeNode.data === node);
    if (targetNode) {
      targetNode.focus();
    }
  }

  search(target: any) {
    const keyword = target?.value?.trim() ?? '';
    if (!keyword) {
      // 如果没有搜索关键字，则显示原始数据
      this.dataSource.data = this.originalData;
      this.treeControl.dataNodes = this.dataSource.data;
      this.treeControl.expandAll();
      return;
    }

    const filteredData = this.filterTree(this.originalData, keyword.toLowerCase());
    this.dataSource.data = filteredData;
    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }

  filterTree(data: Node[], keyword: string): Node[] {
    const filteredNodes: Node[] = [];

    for (const node of data) {
      const children = this.filterTree(node.children, keyword);
      if (node.displayName.toLowerCase().includes(keyword) || children.length > 0) {
        filteredNodes.push({ ...node, children });
      }
    }

    return filteredNodes;
  }
}
