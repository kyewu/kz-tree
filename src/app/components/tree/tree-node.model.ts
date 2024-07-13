import { v4 as uuidv4 } from 'uuid';
export class TreeNode {
  id: number;
  parentId: number;
  displayName: string;
  children: TreeNode[];
  expanded: boolean;
  selected: boolean;
  level: number = 1;
  uuid: string;
  [key: string]: any;
  

  constructor(data: any, level: number = 1) {
    this.id = data.id;
    this.parentId = data.parentId;
    this.displayName = data.displayName;
    this.level = level;
    this.uuid = uuidv4();
    this.children = data.children.map((child: any) => new TreeNode(child, level + 1));
    // this.level = level;
    this.expanded = false;
    this.selected = false;
    for(const key in data) {
      if(!['id', 'parentId', 'displayName', 'children','expanded','selected'].includes(key)) {
        this[key] = data[key];
    }
  }
}
}