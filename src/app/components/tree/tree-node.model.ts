export class TreeNode {
  id: number;
  parentId: number;
  displayName: string;
  // recipeName: string | null;
  // description: string | null;
  // createdDate: string;
  // createdBy: string;
  // modificationDate: string;
  // modifiedBy: string;
  // active: boolean;
  // topLevel: boolean;
  // recipe: boolean;
  children: TreeNode[];
  // level?: number;
  expanded: boolean;
  selected: boolean;
  level: number = 1;
  uuid: string;
  [key: string]: any;
  

  constructor(data: any, level: number = 1) {
    this.id = data.id;
    this.parentId = data.parentId;
    this.displayName = data.displayName;
    // this.recipeName = data.recipeName;
    // this.description = data.description;
    // this.createdDate = data.createdDate;
    // this.createdBy = data.createdBy;
    // this.modificationDate = data.modificationDate;
    // this.modifiedBy = data.modifiedBy;
    // this.active = data.active;
    // this.topLevel = data.topLevel;
    // this.recipe = data.recipe;
    this.level = level;
    this.uuid = `${level}-${this.id}`;
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